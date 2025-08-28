"use client";

import { useCookieConsent } from "@/providers/CookieConsentProvider";

export const ToggleContsentModalButton = () => {
  const { toggleConsent } = useCookieConsent();
  return (
    <button onClick={toggleConsent} className="text-primaryLight hover:text-primary transition-colors">
      Cookie Consent
    </button>
  );
};
