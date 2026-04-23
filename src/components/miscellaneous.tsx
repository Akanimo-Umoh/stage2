import plusIcon from "@/assets/icon-plus.svg"

export default function miscellaneous() {
  return (
    <div>
      {/* new invoice button */}
      <button className="flex h-12 w-37.5 cursor-pointer items-center gap-4 rounded-[24px] bg-01 pl-2 hover:bg-02">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
          <img src={plusIcon} alt="" />
        </div>

        <p className="variant-heading-s text-white">New Invoice</p>
      </button>

      {/* mark as paid */}
      <button className="variant-heading-s h-12 w-[131px] cursor-pointer rounded-[24px] bg-01 text-white hover:bg-02">
        Mark as Paid
      </button>

      {/* edit default light */}
      <button className="variant-heading-s h-12 w-[73px] cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07 hover:bg-05">
        Edit
      </button>

      {/* edit default dark */}
      <button className="variant-heading-s h-12 w-[73px] cursor-pointer rounded-[24px] bg-04 text-05 hover:bg-white">
        Edit
      </button>

      {/* save as draft light */}
      <button className="variant-heading-s h-12 w-[133px] cursor-pointer rounded-[24px] bg-[#373B53] text-06 hover:bg-08">
        Save as Draft
      </button>

      {/* save as draft dark */}
      <button className="variant-heading-s h-12 w-[133px] cursor-pointer rounded-[24px] bg-[#373B53] text-05 hover:bg-03">
        Save as Draft
      </button>

      {/* delete */}
      <button className="variant-heading-s h-12 w-[89px] cursor-pointer rounded-[24px] bg-09 text-white hover:bg-10">
        Delete
      </button>

      {/* add new item */}
      <button className="variant-heading-s h-12 w-[350px] cursor-pointer rounded-[24px] bg-[#F9FAFE] text-07 hover:bg-05">
        + Add New Item
      </button>
    </div>
  )
}
