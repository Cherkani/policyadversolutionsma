import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm shadow-slate-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-900"
      aria-pressed={isDark}
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 ${isDark ? "text-slate-400" : "text-amber-500"}`} />
      <Moon className={`h-4 w-4 ${isDark ? "text-sky-300" : "text-slate-400"}`} />
    </button>
  )
}
