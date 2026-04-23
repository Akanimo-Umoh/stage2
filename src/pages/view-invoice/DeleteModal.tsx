import { useEffect, useRef } from "react"

type DeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  invoiceId: string
  onConfirm: () => void
}

export default function DeleteModal({
  isOpen,
  onClose,
  invoiceId,
  onConfirm,
}: DeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus()
    }
  }, [isOpen])

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

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="modal-overlay fixed inset-0 z-100 flex min-h-screen w-full items-center justify-center overflow-y-auto bg-black/50"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="card-shadow modal-content-center inset-0 mx-6 max-w-120 rounded-xl bg-white px-8 pt-8.5 pb-8 md:px-12 md:pt-[51px] md:pb-12 dark:bg-03"
      >
        <p className="text-[24px] leading-8 font-bold tracking-[-0.5px]">
          Confirm Deletion
        </p>

        <p className="body-variant mt-2 leading-5.5 text-06 md:mt-3">
          Are you sure you want to delete invoice <span>#{invoiceId}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-5.5 flex items-center justify-end gap-2 md:mt-3.5">
          <button
            onClick={onClose}
            className="variant-heading-s h-12 w-[91px] cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07 dark:bg-04 dark:text-05"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="variant-heading-s h-12 w-[89px] cursor-pointer rounded-[24px] bg-09 text-white hover:bg-10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
