import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import calendarIcon from "@/assets/icon-calendar.svg"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  date: Date
  onDateChange: (date: Date) => void
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  //   const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "form-input variant-heading-s flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3",
            !date && "text-gray-400"
          )}
        >
          {format(date, "dd MMM yyyy")}

          <img src={calendarIcon} alt="" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              onDateChange(d)
              setOpen(false)
            }
          }}
          autoFocus
          className="dark:bg-04"
          classNames={{
            day_button: "hover:!text-[#9277FF] cursor-pointer",
            selected: "dark:text-red-800",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
