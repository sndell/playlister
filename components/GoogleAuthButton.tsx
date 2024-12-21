"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
};

export const GoogleAuthButton = ({ isLoggedIn }: Props) => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: () => fetch("/api/auth/login").then((res) => res.json()),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => fetch("/api/auth/logout").then((res) => res.json()),
    onSuccess: () => {
      router.refresh();
    },
  });

  if (isLoggedIn)
    return (
      <div className="w-full text-primary text-base gap-2 items-center flex">
        <span>Your playlists</span>
        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="text-sm text-primaryLight hover:underline"
        >
          {logoutMutation.isPending ? "Logging out..." : "Revoke access"}
        </button>
      </div>
    );

  return (
    <button
      onClick={() => loginMutation.mutate()}
      disabled={loginMutation.isPending}
      className="flex gap-2 justify-center items-center py-2 w-full bg-white rounded-xl border text-secondary border-white/70"
    >
      <span className="icon-[flat-color-icons--google] text-2xl" />
      {loginMutation.isPending ? "Loading..." : "Continue with Google"}
    </button>
  );
};
