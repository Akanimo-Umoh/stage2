type AddNewItemProps = {
  onAdd: () => void
}

export default function AddNewItem({ onAdd }: AddNewItemProps) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="variant-heading-s h-12 w-[350px] w-full cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07 hover:bg-05 dark:bg-04 dark:text-06 dark:hover:bg-05"
    >
      + Add New Item
    </button>
  )
}
