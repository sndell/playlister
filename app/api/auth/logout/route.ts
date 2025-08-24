import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { oauth2Client } from "@/lib/google";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken || refreshToken) {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    try {
      if (refreshToken) await oauth2Client.revokeToken(refreshToken);
      else if (accessToken) await oauth2Client.revokeToken(accessToken);
    } catch (error) {
      console.error("Error revoking tokens:", error);
    }
  }

  // Always clear local storage regardless of revocation success
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({ message: "Logged out successfully" });
}
