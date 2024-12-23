import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/google";

export async function GET() {
  const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  return NextResponse.json({ url });
}
