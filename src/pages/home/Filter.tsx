import { useState } from "react"
import arrowIcon from "@/assets/icon-right-arrow.svg"

type FilterProps = {
  selected: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (selected: any) => void
}

export function Filter({ selected, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  //   const [selected, setSelected] = useState<string[]>([])
  const options = ["draft", "pending", "paid"] as const

  const toggle = (option: (typeof options)[number]) => {
    onChange((prev: string[]) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="relative">
      {/* trigger */}
      <button
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

          <div className="dropdown-shadow absolute top-full left-1/2 z-20 mt-5.5 w-48 -translate-x-1/2 rounded-xl bg-white p-6 dark:bg-04">
            <div className="flex flex-col gap-3.75">
              {options.map((option) => (
                <label
                  key={option}
                  onClick={() => toggle(option)}
                  className="flex h-4.25 w-fit cursor-pointer items-center gap-3.25"
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-xs hover:border-01 ${
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
