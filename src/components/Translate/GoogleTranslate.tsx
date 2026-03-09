"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import Cookies from "js-cookie";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (options: object, container: string) => void;
      };
    };
  }
}

export const languages = [
  { label: "English (US)", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "English (UK)", value: "en-uk", src: "https://flagcdn.com/h60/gb.png" },
  { label: "English (Canada)", value: "en-ca", src: "https://flagcdn.com/h60/ca.png" },
  { label: "English (Australia)", value: "en-au", src: "https://flagcdn.com/h60/au.png" },
  { label: "English (New Zealand)", value: "en-nz", src: "https://flagcdn.com/h60/nz.png" },
  { label: "English (South Africa)", value: "en-za", src: "https://flagcdn.com/h60/za.png" },
  { label: "Arabic", value: "ar", src: "https://flagcdn.com/h60/ke.png" },
  { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
  { label: "French", value: "fr", src: "https://flagcdn.com/h60/fr.png" },
];


export default function GoogleTranslate() {
  const [selected, setSelected] = useState("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const cookieValue = Cookies.get("googtrans");
    if (typeof cookieValue === "string") {
      const parts = cookieValue.split("/");
      const target = parts[2];
      const match = languages.find((l) => l.value === target);
      if (match) setSelected(match.value);
    }
  }, []);

  useEffect(() => {     window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "auto",
            includedLanguages: languages.map((l) => l.value).join(","),
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  useEffect(() => {
    const combo = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (combo) {
      combo.value = selected;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  if (!isClient) return null; // prevent hydration mismatch

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div id="google_translate_element" style={{ display: "none" }} />

      <label
        htmlFor="language-select"
        style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}
      >
        Language
      </label>
      <select
        id="language-select"
        value={selected}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "6px 8px",
          borderRadius: 4,
          border: "1px solid #ccc",
          appearance: "none",
          backgroundColor: "#fff",
          backgroundImage:
            `url(${languages.find((l) => l.value === selected)?.src}), 
             linear-gradient(45deg, transparent 50%, gray 50%), 
             linear-gradient(135deg, gray 50%, transparent 50%)`,
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
          backgroundPosition:
            "5px center, calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)",
          backgroundSize: "24px 16px, 5px 5px, 5px 5px",
          paddingLeft: 34,
          cursor: "pointer",
          color: "black",
        }}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
