import arrowIcon from "@/assets/icon-right-arrow.svg"
import { useNavigate, useParams } from "react-router-dom"
import Details from "./Details"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"
import MarkAsPaid from "@/components/MarkAsPaid"
import EditModal from "./EditModal"
import { useRef, useState } from "react"
import DeleteModal from "./DeleteModal"
import { useInvoices } from "@/context/InvoiceContext"

export default function ViewInvoice() {
  const navigate = useNavigate()
  // const editBtnRef = useRef<HTMLButtonElement>(null)
  const editBtnRefMd = useRef<HTMLButtonElement>(null)
  const editBtnRefMobile = useRef<HTMLButtonElement>(null)
  // const deleteBtnRef = useRef<HTMLButtonElement>(null)
  const deleteBtnRefMd = useRef<HTMLButtonElement>(null)
  const deleteBtnRefMobile = useRef<HTMLButtonElement>(null)
  const { id } = useParams()
  const { invoices, deleteInvoice, markAsPaid } = useInvoices()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const invoice = invoices.find((inv) => inv.id === id)

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

  if (!invoice) {
    return (
      <div className="mt-8.25 px-6 lg:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-6"
        >
          <img src={arrowIcon} alt="" className="rotate-180" />
          <p className="variant-heading-s">Go back</p>
        </button>
        <p className="body-variant mt-8 text-06">Invoice not found.</p>
      </div>
    )
  }

  const style = statusStyles[invoice.status]

  const handleDelete = () => {
    deleteInvoice(invoice.id)
    setIsDeleteOpen(false)
    navigate("/")
  }

  const handleMarkAsPaid = () => {
    markAsPaid(invoice.id)
  }

  const getActiveEditRef = () =>
    editBtnRefMd.current?.offsetParent ? editBtnRefMd : editBtnRefMobile

  const getActiveDeleteRef = () =>
    deleteBtnRefMd.current?.offsetParent ? deleteBtnRefMd : deleteBtnRefMobile

  return (
    <div className="mt-8.25 md:mt-12.25 md:mb-33.75 lg:mt-16.25">
      <div className="px-6 lg:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-6"
        >
          <img src={arrowIcon} alt="" className="rotate-180" />
          <p className="variant-heading-s">Go back</p>
        </button>

        <div className="mt-7.75">
          {/* status */}
          <div className="card-shadow flex items-center justify-between rounded-xl bg-invoice-card-bg p-6 pb-6.75 md:px-8 md:py-5">
            <div className="flex w-full items-center justify-between md:justify-start md:gap-5">
              <p className="body-variant text-status-text">Status</p>

              <div
                className={`flex h-10 w-26 items-center justify-center gap-2 rounded-[6px] ${style.bg}`}
              >
                <div className={`h-2 w-2 rounded-full ${style.dot}`} />
                <p className={`variant-heading-s ${style.text}`}>
                  {style.label}
                </p>
              </div>
            </div>

            {/* modify buttons for md screens up */}
            <div className="hidden items-center justify-center gap-2 md:flex">
              {invoice.status !== "paid" && (
                <EditButton
                  onEdit={() => setIsEditOpen(true)}
                  triggerRef={editBtnRefMd}
                />
              )}

              <DeleteButton
                onDelete={() => setIsDeleteOpen(true)}
                triggerRef={deleteBtnRefMd}
              />

              {invoice.status === "pending" && (
                <MarkAsPaid onMarkAsPaid={handleMarkAsPaid} />
              )}
            </div>
          </div>

          {/* details */}
          <div className="mt-4 md:mt-6">
            <Details invoice={invoice} />
          </div>
        </div>
      </div>

      <div className="card-shadow mt-14 flex items-center justify-center gap-2 bg-modify-ctn pt-5.25 pb-5.5 md:hidden">
        {invoice.status !== "paid" && (
          <EditButton
            onEdit={() => setIsEditOpen(true)}
            triggerRef={editBtnRefMobile}
          />
        )}

        <DeleteButton
          onDelete={() => setIsDeleteOpen(true)}
          triggerRef={deleteBtnRefMobile}
        />

        {invoice.status === "pending" && (
          <MarkAsPaid onMarkAsPaid={handleMarkAsPaid} />
        )}
      </div>

      <EditModal
        key={isEditOpen ? invoice.id : "closed"}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        invoice={invoice}
        getTriggerRef={getActiveEditRef}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        invoiceId={invoice.id}
        onConfirm={handleDelete}
        getTriggerRef={getActiveDeleteRef}
      />
    </div>
  )
}
