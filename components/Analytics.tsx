"use client";

import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const Analytics = () => {
  const { consent } = useCookieConsent();

  if (consent === "optional") return <GoogleAnalytics gaId="G-NL6DM2L8LE" />;

  return null;
};
