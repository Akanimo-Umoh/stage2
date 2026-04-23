import arrowIcon from "@/assets/icon-right-arrow.svg"
import type { Invoice } from "@/types/invoice"
import { format } from "date-fns"
import { Link } from "react-router-dom"
// import invoices from "@/data/invoices.json"

type InvoiceCardProps = {
  invoices: Invoice[]
}

const statusStyles = {
  paid: {
    bg: "bg-[#33D69F]/10",
    dot: "bg-[#33D69F]",
    text: "text-[#33D69F]",
    label: "Paid",
  },
  pending: {
    bg: "bg-[#FF8F00]/10",
    dot: "bg-[#FF8F00]",
    text: "text-[#FF8F00]",
    label: "Pending",
  },
  draft: {
    bg: "bg-[#373B53]/10 dark:bg-[#DFE3FA]/10",
    dot: "bg-[#373B53] dark:bg-[#DFE3FA]",
    text: "text-[#373B53] dark:text-[#DFE3FA]",
    label: "Draft",
  },
}

export default function InvoiceCard({ invoices }: InvoiceCardProps) {
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => {
        const style = statusStyles[invoice.status]

        return (
          <Link
            key={invoice.id}
            to={`/invoice-details/${invoice.id}`}
            className="card-shadow flex cursor-pointer items-center justify-center rounded-xl bg-invoice-card-bg px-6 pt-6.25 pb-5.5 hover:border hover:border-01 md:items-center md:gap-5 md:px-6 md:py-4"
          >
            <div className="flex w-full flex-col justify-between space-y-6 md:w-full md:flex-row md:items-center md:justify-between md:gap-7 md:space-y-0">
              <div className="flex items-center justify-between">
                <p className="variant-heading-s md:h-full">
                  <span className="text-07">#</span>
                  {invoice.id}
                </p>
                <p className="body-variant text-invoice-name md:hidden">
                  {invoice.clientName}
                </p>
              </div>

              <div className="flex items-center justify-between md:flex-1 md:gap-10">
                <div className="space-y-2.25 md:flex md:flex-1 md:items-center md:justify-between md:gap-2.5 md:space-y-0">
                  <p className="body-variant text-invoice-due-text md:w-25">
                    Due {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
                  </p>
                  <p className="body-variant hidden text-invoice-name md:ml-9.5 md:flex md:flex-1">
                    {invoice.clientName}
                  </p>
                  <p className="text-heading-s">£ {invoice.total.toFixed(2)}</p>
                </div>

                <div
                  className={`flex h-10 w-26 items-center justify-center gap-2 rounded-[6px] ${style.bg}`}
                >
                  <div
                    className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                  />
                  <p className={`variant-heading-s ${style.text}`}>
                    {style.label}
                  </p>
                </div>
              </div>
            </div>

            <img src={arrowIcon} alt="" className="hidden md:flex" />
          </Link>
        )
      })}
    </div>
  )
}
