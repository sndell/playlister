import { cookies } from "next/headers";
import { oauth2Client } from "./google";

export async function setupTokenRefresh() {
  const cookieStore = await cookies();

  // Set up automatic token refresh handler
  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      // Only save refresh token if it's provided (it may not be in refresh responses)
      cookieStore.set("refreshToken", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    if (tokens.access_token) {
      cookieStore.set("accessToken", tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  });
}

export async function authenticateWithTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    throw new Error("Not authenticated");
  }

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  await setupTokenRefresh();

  return { accessToken, refreshToken };
}

export async function tryAuthenticateWithTokens() {
  try {
    return await authenticateWithTokens();
  } catch {
    return null;
  }
}
