import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "@/lib/google";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const cookieStore = await cookies();
    cookieStore.set("accessToken", tokens.access_token as string, {
      httpOnly: true,
    });

    if (tokens.refresh_token) {
      cookieStore.set("refreshToken", tokens.refresh_token as string, {
        httpOnly: true,
      });
    }
    return NextResponse.redirect(process.env.APP_URL as string);
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
