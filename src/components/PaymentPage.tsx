import { useMemo, useState } from "react"
import { MessageCircle, Phone, ShieldCheck, Clock } from "lucide-react"
import PaymentMethodCard from "./PaymentMethodCard"
import PaymentMethodModal from "./PaymentMethodModal"
import { paymentMethods } from "../data/paymentMethods"
import { translate, isRTL } from "../lib/i18n"
import type { Language, PaymentMethod } from "../types"

interface PaymentPageProps {
  language: Language
  onBack: () => void
}

export default function PaymentPage({ language, onBack }: PaymentPageProps) {
  const handleContactSupport = () => {
    window.open("https://wa.me/1234567890", "_blank")
  }
  const rtl = isRTL(language)
  const backArrow = rtl ? "→" : "←"
  const [activeMethod, setActiveMethod] = useState<PaymentMethod | null>(null)

  const badges = useMemo(
    () => [
      {
        icon: ShieldCheck,
        label: translate("WARRANTY", language),
        description: translate("Warranty remains valid as long as client uses account properly and without policy violations.", language),
      },
      {
        icon: Clock,
        label: translate("REVIEW TIME", language),
        description: translate("Verification can take 24h–7 days depending on platform decision.", language),
      },
    ],
    [language],
  )

  return (
    <div className="space-y-6 p-6 lg:p-10">
      <div className="flex flex-col gap-4 rounded-2xl bg-slate-50/80 p-6 shadow-inner dark:bg-slate-800/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {translate("Payment Methods", language)}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {translate("Click on a payment method to view payment details", language)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {translate("Payment instructions are available in your preferred language.", language)}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 ${rtl ? "flex-row-reverse" : ""}`}
          >
            <span aria-hidden>{backArrow}</span>
            <span>{translate("Back to Policies", language)}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-white/80 p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <badge.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{badge.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-words">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            language={language}
            onOpen={setActiveMethod}
            isHighlighted={activeMethod?.id === method.id}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg dark:border-slate-800/70 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 text-white shadow-lg">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{translate("Next Steps", language)}</h2>
              <p className="text-slate-600 dark:text-slate-300">
                {translate("After payment, please contact support for confirmation.", language)}
              </p>
            </div>
          </div>
          <button
            onClick={handleContactSupport}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-400/40 transition hover:scale-[1.01] dark:from-slate-700 dark:to-slate-600"
          >
            <Phone className="h-5 w-5" />
            {translate("Contact Support", language)}
          </button>
        </div>
      </div>

      {activeMethod && (
        <PaymentMethodModal method={activeMethod} language={language} onClose={() => setActiveMethod(null)} />
      )}
    </div>
  )
}
