import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.APP_URL}/api/auth/callback`
  );

  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });

  return NextResponse.json({ url });
}
