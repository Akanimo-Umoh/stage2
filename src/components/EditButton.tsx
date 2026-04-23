type EditButtonProps = {
  onEdit: () => void
}

export default function EditButton({ onEdit }: EditButtonProps) {
  return (
    <button
      onClick={onEdit}
      className="variant-heading-s h-12 w-[73px] cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07 hover:bg-05"
    >
      Edit
    </button>
  )
}
