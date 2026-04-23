type DeleteButtonProps = {
  onDelete: () => void
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      className="variant-heading-s h-12 w-[89px] cursor-pointer rounded-[24px] bg-09 text-white hover:bg-10"
    >
      Delete
    </button>
  )
}
