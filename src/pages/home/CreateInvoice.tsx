import arrowIcon from "@/assets/icon-right-arrow.svg"
import { useEffect, useRef, useState } from "react"
import AddNewItem from "@/components/AddNewItem"
import BillFrom from "@/components/BillFrom"
import BillTo from "@/components/BillTo"
import NewItem from "@/components/NewItem"
import { useInvoices } from "@/context/InvoiceContext"
import type { FormErrors, Invoice, InvoiceItem } from "@/types/invoice"
import { addDays, format } from "date-fns"

type CreateModalProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

type ItemField = {
  id: string
  name: string
  quantity: number
  price: number
}

function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)]
  const randomNumbers = Math.floor(1000 + Math.random() * 9000)
  return `${randomLetters}${randomNumbers}`
}

export default function CreateInvoice({
  isOpen,
  onClose,
  triggerRef,
}: CreateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const { addInvoice } = useInvoices()

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus()
    }
  }, [isOpen])

  // sender
  const [senderStreet, setSenderStreet] = useState("")
  const [senderCity, setSenderCity] = useState("")
  const [senderPostCode, setSenderPostCode] = useState("")
  const [senderCountry, setSenderCountry] = useState("")

  // client
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientStreet, setClientStreet] = useState("")
  const [clientCity, setClientCity] = useState("")
  const [clientPostCode, setClientPostCode] = useState("")
  const [clientCountry, setClientCountry] = useState("")

  // invoice info
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date())
  const [paymentTerms, setPaymentTerms] = useState(30)
  const [description, setDescription] = useState("")

  // items
  const [items, setItems] = useState<ItemField[]>([])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 },
    ])
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (
    id: string,
    field: keyof ItemField,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const buildInvoice = (status: "draft" | "pending"): Invoice => {
    const createdAt = format(invoiceDate, "yyyy-MM-dd")
    const paymentDue = format(addDays(invoiceDate, paymentTerms), "yyyy-MM-dd")

    const invoiceItems: InvoiceItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }))

    const total = invoiceItems.reduce((sum, item) => sum + item.total, 0)

    return {
      id: generateId(),
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: invoiceItems,
      total,
    }
  }

  const validate = (): FormErrors => {
    const errors: FormErrors = {}

    if (!senderStreet.trim()) errors.senderStreet = "can't be empty"
    if (!senderCity.trim()) errors.senderCity = "can't be empty"
    if (!senderPostCode.trim()) errors.senderPostCode = "can't be empty"
    if (!senderCountry.trim()) errors.senderCountry = "can't be empty"
    if (!clientName.trim()) errors.clientName = "can't be empty"
    if (!clientEmail.trim()) errors.clientEmail = "can't be empty"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail))
      errors.clientEmail = "must be a valid email"
    if (!clientStreet.trim()) errors.clientStreet = "can't be empty"
    if (!clientCity.trim()) errors.clientCity = "can't be empty"
    if (!clientPostCode.trim()) errors.clientPostCode = "can't be empty"
    if (!clientCountry.trim()) errors.clientCountry = "can't be empty"
    if (!description.trim()) errors.description = "can't be empty"
    if (items.length === 0) errors.items = "An item must be added"
    else {
      const hasInvalidItem = items.some(
        (item) => !item.name.trim() || item.quantity <= 0 || item.price <= 0
      )
      if (hasInvalidItem) errors.items = "All fields must be added"
    }

    if (Object.keys(errors).filter((k) => k !== "items").length > 0) {
      errors.general = "All fields must be added"
    }

    return errors
  }

  const resetForm = () => {
    setSenderStreet("")
    setSenderCity("")
    setSenderPostCode("")
    setSenderCountry("")
    setClientName("")
    setClientEmail("")
    setClientStreet("")
    setClientCity("")
    setClientPostCode("")
    setClientCountry("")
    setInvoiceDate(new Date())
    setPaymentTerms(30)
    setDescription("")
    setItems([])
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
    triggerRef?.current?.focus()
  }

  // escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const scrollToFirstError = (validationErrors: FormErrors) => {
    const fieldOrder = [
      "senderStreet",
      "senderCity",
      "senderPostCode",
      "senderCountry",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "description",
      "items",
    ]

    const firstError = fieldOrder.find((key) => key in validationErrors)
    if (!firstError) return

    const el = document.getElementById(firstError)
    if (!el) return

    const scrollContainer = el.closest(".overflow-y-auto")
    if (scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top
      const elTop = el.getBoundingClientRect().top
      const offset = elTop - containerTop + scrollContainer.scrollTop - 100

      scrollContainer.scrollTo({ top: offset, behavior: "smooth" })
    }

    el.focus()
  }

  const handleSaveAndSend = (e: React.SubmitEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      scrollToFirstError(validationErrors)
      return
    }
    const invoice = buildInvoice("pending")
    addInvoice(invoice)
    handleClose()
  }

  const handleSaveAsDraft = () => {
    // drafts only validate items
    if (items.length === 0) {
      setErrors({ items: "An item must be added" })
      const el = document.getElementById("items")
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    const invoice = buildInvoice("draft")
    addInvoice(invoice)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="modal-overlay fixed inset-0 z-40 min-h-screen w-full md:overflow-hidden md:bg-black/50"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="modal-content inset-0 z-50 mt-18 flex h-[calc(100vh-72px)] flex-col bg-white pt-8.25 md:mt-20 md:h-[calc(100vh-80px)] md:w-154 md:overflow-hidden md:rounded-r-4xl md:pt-14.75 lg:mt-0 lg:h-screen lg:w-[719px] lg:pl-[103px] dark:bg-12"
      >
        <div>
          <button
            onClick={handleClose}
            className="mx-6 flex cursor-pointer items-center gap-6 md:hidden"
          >
            <img src={arrowIcon} alt="" className="rotate-180" />
            <p className="variant-heading-s">Go back</p>
          </button>

          <p className="text-heading-m mx-6 mt-6.5 md:mx-14 lg:leading-8">
            New Invoice
          </p>
        </div>

        <form
          onSubmit={handleSaveAndSend}
          className="mt-5.5 flex min-h-0 flex-1 flex-col md:mt-11.5"
        >
          <div className="custom-scrollbar flex-1 overflow-y-auto md:mr-8">
            <div>
              <BillFrom
                street={senderStreet}
                onStreetChange={setSenderStreet}
                city={senderCity}
                onCityChange={setSenderCity}
                postCode={senderPostCode}
                onPostCodeChange={setSenderPostCode}
                country={senderCountry}
                onCountryChange={setSenderCountry}
                errors={errors}
              />
            </div>

            <div className="mx-6 mt-10.25 md:mx-14 md:mt-12.25 md:mr-6">
              <BillTo
                clientName={clientName}
                onClientNameChange={setClientName}
                clientEmail={clientEmail}
                onClientEmailChange={setClientEmail}
                clientStreet={clientStreet}
                onClientStreetChange={setClientStreet}
                clientCity={clientCity}
                onClientCityChange={setClientCity}
                clientPostCode={clientPostCode}
                onClientPostCodeChange={setClientPostCode}
                clientCountry={clientCountry}
                onClientCountryChange={setClientCountry}
                invoiceDate={invoiceDate}
                onInvoiceDateChange={setInvoiceDate}
                paymentTerms={paymentTerms}
                onPaymentTermsChange={setPaymentTerms}
                description={description}
                onDescriptionChange={setDescription}
                errors={errors}
              />
            </div>

            <div className="mx-6 mt-[69px] md:mx-14 md:mt-[27px] md:mr-6">
              <NewItem
                items={items}
                onDelete={deleteItem}
                onUpdate={updateItem}
                errors={errors}
              />
            </div>

            <div className="mx-6 mt-12 mb-8 md:mx-14 md:mt-4.5 md:mr-6">
              <AddNewItem onAdd={addItem} />
            </div>

            {(errors.general || errors.items) && (
              <div className="mx-6 mb-10 flex flex-col gap-1 md:mx-14 md:mr-6">
                {errors.general && (
                  <p className="text-[10px] leading-3.75 font-semibold tracking-[-0.21px] text-09">
                    - All fields must be added
                  </p>
                )}
                {errors.items && (
                  <p className="text-[10px] leading-3.75 font-semibold tracking-[-0.21px] text-09">
                    - {errors.items}
                  </p>
                )}
              </div>
            )}

            {/* <div className="empty-bg pointer-events-none sticky bottom-0 h-16 md:h-11.75 border border-red-500" /> */}
          </div>

          <div className="empty-bg pointer-events-none absolute right-0 bottom-22.75 left-0 h-16 w-full md:bottom-27.5 md:h-35.25 md:max-w-154 lg:max-w-179.75" />

          <div className="card-shadow flex items-center justify-between gap-1.75 px-6 pt-5.25 pb-5.5 md:rounded-r-4xl md:bg-transparent md:py-7.75 dark:bg-03 md:dark:bg-transparent">
            <button
              type="button"
              onClick={handleClose}
              className="variant-heading-s h-12 w-full max-w-21 cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07"
            >
              Discard
            </button>

            <div className="flex w-full items-center justify-end gap-1.75 md:gap-2">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                className="variant-heading-s h-12 w-full max-w-[117px] cursor-pointer rounded-[24px] bg-[#373B53] text-06 hover:bg-08 dark:text-05 dark:hover:bg-03"
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className="variant-heading-s h-12 w-full max-w-28 cursor-pointer rounded-[24px] bg-01 text-white hover:bg-02"
              >
                Save & Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
