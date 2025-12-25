import type { Language } from "../types"
import en from "../locales/en.json"
import fr from "../locales/fr.json"
import ar from "../locales/ar.json"

type TranslationMap = Record<Language, Record<string, string>>

const translations: TranslationMap = {
  en,
  fr,
  ar,
}

const rtlLanguages: Language[] = ["ar"]

export const supportedLanguages: { code: Language; label: string; emoji: string }[] = [
  { code: "en", label: "English", emoji: "🇺🇸" },
  { code: "fr", label: "Français", emoji: "🇫🇷" },
  { code: "ar", label: "العربية", emoji: "🇸🇦" },
]

export function translate(text: string, language: Language): string {
  if (!text || language === "en") {
    return text
  }

  const entry = translations[language][text]
  if (entry) {
    return entry
  }

  const trimmed = text.trim()
  if (!trimmed) {
    return text
  }

  return translations[language][trimmed] ?? text
}

export function getLanguageLabel(language: Language) {
  return supportedLanguages.find((lang) => lang.code === language)?.label ?? language
}

export function isRTL(language: Language) {
  return rtlLanguages.includes(language)
}
