import { useState, useEffect, useRef } from "react"
import { CheckCircle2, Globe2 } from "lucide-react"
import { policyTabs } from "../data/policies"
import type { Language } from "../types"
import { translate, getLanguageLabel } from "../lib/i18n"

interface PoliciesPageProps {
  onAgree: () => void
  language: Language
}

export default function PoliciesPage({ onAgree, language }: PoliciesPageProps) {
  const [selectedTabId, setSelectedTabId] = useState(policyTabs[0].id)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const selectedPolicy = policyTabs.find((tab) => tab.id === selectedTabId)!

  useEffect(() => {
    setHasScrolledToBottom(false)
  }, [selectedTabId])

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 50

      if (scrolledToBottom) {
        setHasScrolledToBottom(true)
      }
    }

    const element = contentRef.current
    element?.addEventListener("scroll", handleScroll)

    return () => element?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="space-y-6 p-6 lg:p-10">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              {translate("Live translation", language)}
            </p>
            <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
              {translate("Service & Policy Selection", language)}
            </h1>
            <p className="mt-2 text-white/70">
              {translate("Select a category and review the corresponding policy", language)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
            <Globe2 className="h-5 w-5" />
            {getLanguageLabel(language)}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {policyTabs.map((tab) => {
            const isActive = tab.id === selectedTabId
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTabId(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  isActive ? "bg-white text-slate-900 shadow-lg" : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {translate(tab.label, language)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-white/90 shadow-lg shadow-slate-200/60 dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-slate-900/40">
        <div ref={contentRef} className="h-[520px] overflow-y-auto p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {translate(selectedPolicy.title, language)}
          </h2>
          <div className="mt-6 space-y-10">
            {selectedPolicy.sections.map((section, index) => {
              const translatedHeading = translate(section.heading, language)
              const translatedContent = Array.isArray(section.content)
                ? section.content.map((line) => translate(line, language))
                : translate(section.content, language)

              return (
                <section key={index} className="rounded-2xl bg-slate-50/70 p-6 dark:bg-slate-800/50">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {translatedHeading}
                  </h3>
                  <div className="mt-4 text-slate-700 dark:text-slate-200">
                    {Array.isArray(translatedContent) ? (
                      translatedContent.map((line, idx) => (
                        <p key={idx} className={line === "" ? "h-3" : "leading-relaxed"}>
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="leading-relaxed">{translatedContent}</p>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
        <div className="border-t border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/60">
          <button
            onClick={onAgree}
            disabled={!hasScrolledToBottom}
            className={`mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold transition-all ${
              hasScrolledToBottom
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-glow hover:scale-[1.01]"
                : "cursor-not-allowed bg-slate-200/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
            }`}
          >
            <CheckCircle2 className="h-6 w-6" />
            {translate("I AGREE TO THE POLICY", language)}
          </button>
          {!hasScrolledToBottom && (
            <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
              {translate("Please scroll to the bottom to continue", language)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
