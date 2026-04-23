import plusIcon from "@/assets/icon-plus.svg"
import InvoiceCard from "./InvoiceCard"
import { useRef, useState } from "react"
import CreateInvoice from "./CreateInvoice"
import { Filter } from "./Filter"
import { useInvoices } from "@/context/InvoiceContext"
import type { InvoiceStatus } from "@/types/invoice"
import noInvoiceImg from "@/assets/img-no-invoice.svg"

export default function HomePage() {
  const { invoices } = useInvoices()
  const [isCreateInvoice, setIsCreateInvoice] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([])
  const createBtnRef = useRef<HTMLButtonElement>(null)

  const filteredInvoices =
    selectedStatuses.length === 0
      ? invoices
      : invoices.filter((inv) => selectedStatuses.includes(inv.status))

  const invoiceCountText = () => {
    const count = filteredInvoices.length
    if (count === 0) return "No invoices"
    return count === 1 ? "1 invoice" : `${count} invoices`
  }

  return (
    <div className="my-8 px-6 md:mt-15.25 md:px-12 lg:mt-19.25 lg:px-0">
      {/* header ctn */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.75 md:space-y-1.5">
          <p className="text-heading-m md:text-[36px] md:leading-[33px] md:tracking-[-1.13px]">
            Invoices
          </p>
          <p className="body-variant text-invoice-count md:hidden">
            {invoiceCountText()}
          </p>
          <p className="body-variant hidden text-06 md:flex dark:text-05">
            There are {filteredInvoices.length} total invoices
          </p>
        </div>

        <div className="flex items-center justify-center gap-4.75 md:gap-[41px]">
          <div className="shrink-0">
            <Filter
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
            />
          </div>

          <button
            ref={createBtnRef}
            onClick={() => setIsCreateInvoice(true)}
            className="flex h-12 w-full max-w-37.5 min-w-[90px] flex-1 shrink-0 cursor-pointer items-center justify-start gap-2 rounded-[24px] bg-01 pr-[15px] pl-1.5 hover:bg-02 md:gap-4 md:pl-2"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <img src={plusIcon} alt="" />
            </div>

            <p className="variant-heading-s text-white md:hidden">New</p>
            <p className="variant-heading-s hidden shrink-0 text-white md:flex">
              New Invoice
            </p>
          </button>

          <CreateInvoice
            isOpen={isCreateInvoice}
            onClose={() => setIsCreateInvoice(false)}
            triggerRef={createBtnRef}
          />
        </div>
      </div>

      {/* invoice ctn */}
      <section className="mt-8 md:mt-13.75">
        {filteredInvoices.length === 0 ? (
          // no invoice
          <div className="flex flex-col items-center justify-center">
            <img src={noInvoiceImg} alt="" className="md:h-50 md:w-60" />

            <div className="mt-10.5 flex flex-col items-center justify-center gap-5.75 text-center">
              <p className="text-heading-m text-nothing-here">
                There is nothing here
              </p>
              <p className="body-variant text-new-button max-w-44 md:max-w-48.25">
                Create an invoice by clicking the{" "}
                <span className="font-bold">New</span> button and get started
              </p>
            </div>
          </div>
        ) : (
          <InvoiceCard invoices={filteredInvoices} />
        )}
      </section>
    </div>
  )
}
