type MarkAsPaidProps = {
  onMarkAsPaid: () => void
}

export default function MarkAsPaid({ onMarkAsPaid }: MarkAsPaidProps) {
  return (
    <button
      onClick={onMarkAsPaid}
      className="variant-heading-s h-12 w-[131px] cursor-pointer rounded-[24px] bg-01 text-white hover:bg-02"
    >
      Mark as Paid
    </button>
  )
}
