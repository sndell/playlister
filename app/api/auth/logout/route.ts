import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { oauth2Client } from "@/lib/google";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    oauth2Client.setCredentials({ access_token: accessToken });

    try {
      await oauth2Client.revokeToken(accessToken);
    } catch (error) {
      console.error("Error revoking token:", error);
    }
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({ message: "Logged out successfully" });
}
