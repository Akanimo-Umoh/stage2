type DeleteButtonProps = {
  onDelete: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export default function DeleteButton({
  onDelete,
  triggerRef,
}: DeleteButtonProps) {
  return (
    <button
      ref={triggerRef}
      onClick={onDelete}
      className="variant-heading-s h-12 w-[89px] cursor-pointer rounded-[24px] bg-09 text-white hover:bg-10"
    >
      Delete
    </button>
  )
}
