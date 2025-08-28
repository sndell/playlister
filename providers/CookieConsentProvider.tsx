"use client";

import { createContext, useContext, useLayoutEffect, useState, ReactNode, useEffect } from "react";

type Consent = "required" | "optional";

interface CookieConsentContextType {
  consent: Consent | undefined;
  updateConsent: (consent: Consent) => void;
  showConsentModal: boolean;
  toggleConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<Consent>();
  const [showConsentModal, setShowConsentModal] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem("consent");
    if (!storedConsent) setShowConsentModal(true);
    else setConsent(storedConsent as Consent);
  }, []);

  const updateConsent = (consent: Consent) => {
    localStorage.setItem("consent", consent);
    setConsent(consent);
    setShowConsentModal(false);
  };

  const toggleConsent = () => setShowConsentModal(!showConsentModal);

  const value = {
    consent,
    updateConsent,
    showConsentModal,
    toggleConsent,
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return context;
};
