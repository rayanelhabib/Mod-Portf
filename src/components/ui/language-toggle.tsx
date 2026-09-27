"use client";

import React from "react";
import Image from "next/image";
import styles from "./language-toggle.module.css";
import { useLanguage, Language } from "@/hooks/use-language";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({
  className = "",
}: LanguageToggleProps) {
  const { lang, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLang: Language = e.target.checked ? "de" : "en";
    setLanguage(newLang);
  };

  const isChecked = lang === "de";

  return (
    <label
      className={`${styles.wrapper} ${className}`}
      title={isChecked ? "Language: Deutsch (DE)" : "Language: English (EN)"}
      aria-label="Toggle language between English and German"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={styles.input}
      />
      <img src="/flag-en.png" className={styles.flagEn} alt="English Flag" />
      <img src="/flag-de.png" className={styles.flagDe} alt="German Flag" />
    </label>
  );
}

