"use client";

import { useState, useEffect } from "react";

export type Language = "en" | "de";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred-language") as Language | null;
      if (saved === "en" || saved === "de") {
        setLang(saved);
      }
    } catch (e) {}

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "preferred-language" && (e.newValue === "en" || e.newValue === "de")) {
        setLang(e.newValue as Language);
      }
    };

    const handleLocalChange = (e: CustomEvent<Language>) => {
      setLang(e.detail);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("language-change" as any, handleLocalChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("language-change" as any, handleLocalChange);
    };
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("preferred-language", newLang);
    } catch(e) {}
    window.dispatchEvent(new CustomEvent("language-change", { detail: newLang }));
  };

  return { lang, setLanguage };
}
