import { useState, useRef, useEffect } from "react"
import arrowIcon from "@/assets/icon-right-arrow.svg"

type FilterProps = {
  selected: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (selected: any) => void
}

export function Filter({ selected, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  //   const [selected, setSelected] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const options = ["draft", "pending", "paid"] as const

  const toggle = (option: (typeof options)[number]) => {
    onChange((prev: string[]) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    )
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (e.key !== "Tab") return

      const focusable = dropdownRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), label'
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <div className="relative">
      {/* trigger */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="variant-heading-s flex cursor-pointer items-center justify-between gap-3"
      >
        <p className="md:hidden">Filter</p>
        <p className="hidden md:block">Filter by status</p>
        <img
          src={arrowIcon}
          alt=""
          className={`transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </button>

      {/* dropdown */}
      {isOpen && (
        <>
          {/* dropdown backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* dropdown ctn */}
          <div
            ref={dropdownRef}
            className="dropdown-shadow absolute top-full left-1/2 z-20 mt-5.5 w-48 -translate-x-1/2 rounded-xl bg-white p-6 dark:bg-04"
          >
            <div className="flex flex-col gap-3.75">
              {options.map((option) => (
                <label
                  key={option}
                  tabIndex={0}
                  onClick={() => toggle(option)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggle(option)
                    }
                  }}
                  className="flex h-4.25 w-fit cursor-pointer items-center gap-3.25"
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xs hover:border-01 ${
                      selected.includes(option) ? "bg-01" : "bg-05 dark:bg-03"
                    }`}
                  >
                    {selected.includes(option) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`variant-heading-s ${selected.includes(option) ? "text-04" : ""}`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </p>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
