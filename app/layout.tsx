import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";
import { CookieConsentModal } from "@/components/CookieConsentModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Playlister - YouTube Playlist Viewer",
  description:
    "View and explore YouTube playlists easily. Login with Google to access your private playlists or browse public playlists.",
  keywords: ["YouTube", "playlist", "music", "videos", "Google", "streaming"],
  authors: [{ name: "Playlister" }],
  creator: "Playlister",
  publisher: "Playlister",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CookieConsentProvider>
            <CookieConsentModal />
            {children}
          </CookieConsentProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
