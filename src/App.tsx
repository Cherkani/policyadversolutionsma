import { useEffect, useMemo, useState } from "react"
import PoliciesPage from "./components/PoliciesPage"
import PaymentPage from "./components/PaymentPage"
import LanguageSelector from "./components/LanguageSelector"
import ThemeToggle from "./components/ThemeToggle"
import type { Language, PageType } from "./types"
import { translate, isRTL } from "./lib/i18n"

type ThemeMode = "light" | "dark"

const THEME_KEY = "policy-portal-theme"
const LANGUAGE_KEY = "policy-portal-language"

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === "light" || stored === "dark") {
    return stored
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const getPreferredLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en"
  }

  const stored = window.localStorage.getItem(LANGUAGE_KEY)
  if (stored === "fr" || stored === "en" || stored === "ar") {
    return stored as Language
  }

  return "en"
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("policies")
  const [theme, setTheme] = useState<ThemeMode>(() => getPreferredTheme())
  const [language, setLanguage] = useState<Language>(() => getPreferredLanguage())

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }
    const root = document.documentElement
    root.lang = language
    const dir = isRTL(language) ? "rtl" : "ltr"
    root.dir = dir
    document.body.dir = dir
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const steps = useMemo(
    () => [
      { id: "policies", label: translate("Step 1 · Review Policies", language) },
      { id: "payment", label: translate("Step 2 · Payment", language) },
    ],
    [language],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-sky-200/30 dark:bg-sky-500/20" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-200/30 dark:bg-emerald-500/10" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:px-0">
        <header className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand dark:bg-sky-900/40 dark:text-sky-200">
              {translate("Policy & Billing Hub", language)}
            </span>
            <div className="flex items-center gap-3">
              <LanguageSelector language={language} onChange={setLanguage} />
              <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
            <div className="flex flex-wrap gap-2">
              {steps.map((step) => {
                const isActive = currentPage === step.id
                return (
                  <span
                    key={step.id}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${
                      isActive
                        ? "border-emerald-400 bg-white text-emerald-600 shadow dark:bg-slate-900"
                        : "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgba(16,185,129,0.8)]" aria-hidden />
                    <span className={`${isActive ? "text-inherit" : "text-slate-400 dark:text-slate-500"}`}>{step.label}</span>
                  </span>
                )
              })}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {translate("Currently viewing:", language)}{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {currentPage === "policies"
                  ? translate("Step 1 · Review Policies", language)
                  : translate("Step 2 · Payment", language)}
              </span>
            </div>
          </div>
        </header>

        <div className="rounded-3xl border border-white/60 bg-white/90 shadow-elevated backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
          {currentPage === "policies" ? (
            <PoliciesPage language={language} onAgree={() => setCurrentPage("payment")} />
          ) : (
            <PaymentPage language={language} onBack={() => setCurrentPage("policies")} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
