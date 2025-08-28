"use client";

import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { cn } from "@/util/cn";
import { useState, useEffect } from "react";

export const CookieConsentModal = () => {
  const { consent, updateConsent, showConsentModal } = useCookieConsent();
  const [selected, setSelected] = useState<"required" | "optional">("required");

  useEffect(() => {
    if (consent) setSelected(consent);
  }, [consent]);

  const handleContinue = () => {
    updateConsent(selected);
  };

  if (!showConsentModal) return;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm grid place-content-center p-3 z-50">
      <div className="bg-background border border-primary rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primaryDark p-6 text-center">
          <h2 className="text-xl font-semibold text-primary">Cookie Preferences</h2>
          <p className="text-primaryLight text-sm">Choose how we can use cookies to improve your experience</p>
        </div>
        {/* Content */}
        <div className="p-3 pt-0 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CookieConsentOption
              title="Essential Only"
              description="Required for basic functionality"
              consent={["Authentication tokens", "Session management"]}
              isSelected={selected === "required"}
              selectOption={() => setSelected("required")}
            />
            <CookieConsentOption
              title="All Cookies"
              description="Enhanced experience with analytics"
              consent={["Authentication tokens", "Session management", "Analytics & insights", "Performance tracking"]}
              isSelected={selected === "optional"}
              selectOption={() => setSelected("optional")}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleContinue}
              className="flex-1 py-1.5 transition-all shadow-lg hover:shadow-accent/25 bg-accent hover:bg-accent/90 rounded-xl text-white font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CookieConsentOption = ({
  title,
  description,
  consent,
  isSelected,
  selectOption,
}: {
  title: string;
  description: string;
  consent: string[];
  isSelected: boolean;
  selectOption: () => void;
}) => {
  return (
    <button
      onClick={selectOption}
      className={cn(
        "relative flex flex-col text-start transition-all rounded-xl p-3 border-2 group hover:shadow-lg",
        isSelected ? "border-accent bg-rose-500/5" : "border-primary hover:border-primaryLight"
      )}
    >
      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-all",
          isSelected ? "border-accent bg-accent" : "border-primary group-hover:border-primary"
        )}
      ></div>

      {/* Title and description */}
      <div className="mb-3">
        <h3 className={"text-primary"}>{title}</h3>
        <p className="text-xs text-primaryLight">{description}</p>
      </div>

      {/* Cookie list */}
      <div className="space-y-1 px-2 pb-2">
        {consent.map((option) => (
          <div key={option} className="flex items-center text-xs text-primaryLight">
            <span className="mr-2">•</span>
            {option}
          </div>
        ))}
      </div>
    </button>
  );
};
