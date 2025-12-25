import type { Language } from "../types"
import { supportedLanguages, translate } from "../lib/i18n"

interface LanguageSelectorProps {
  language: Language
  onChange: (language: Language) => void
}

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-200">
      <span className="whitespace-nowrap">{translate("Language", language)}</span>
      <div className="flex gap-1 rounded-full border border-slate-200/70 bg-white/80 px-1 py-1 shadow-inner dark:border-white/20 dark:bg-slate-900/60">
        {supportedLanguages.map((option) => {
          const isActive = option.code === language
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => onChange(option.code)}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                isActive ? "bg-brand text-slate-900 shadow" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
              aria-pressed={isActive}
            >
              <span className="text-lg leading-none" aria-hidden>
                {option.emoji}
              </span>
              <span className="sr-only">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
