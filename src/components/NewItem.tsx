// import deleteIcon from "@/assets/icon-delete.svg"
import type { FormErrors } from "@/types/invoice"

type ItemField = {
  id: string
  name: string
  quantity: number
  price: number
}

type NewItemProps = {
  items: ItemField[]
  onDelete: (id: string) => void
  onUpdate: (id: string, field: keyof ItemField, value: string | number) => void
  errors: FormErrors
}

export default function NewItem({
  items,
  onDelete,
  onUpdate,
  errors,
}: NewItemProps) {
  return (
    <div>
      <p className="text-[18px] leading-8 font-bold tracking-[-0.38px] text-[#777F98]">
        Item List
      </p>

      {/* headers - always visible on md */}
      {items.length > 0 && (
        <div className="mt-3.5 hidden md:flex md:items-center md:gap-4">
          <p className="body-variant w-[214px] text-label-text">Item Name</p>
          <div className="flex flex-1 items-center gap-4">
            <p className="body-variant w-11.5 text-label-text">Qty.</p>
            <p className="body-variant w-25 text-label-text">Price</p>
            <p className="body-variant text-label-text">Total</p>
          </div>
        </div>
      )}

      {/* new item */}
      <div
        id="items"
        className="mt-5.5 space-y-[49px] md:mt-3.5 md:space-y-4.5"
      >
        {items.map((item) => {
          const nameError = errors.items && !item.name.trim()
          const qtyError = errors.items && item.quantity <= 0
          const priceError = errors.items && item.price <= 0

          return (
            // {/* new item ctn */}
            <div
              key={item.id}
              className="md:flex md:items-center md:justify-between md:gap-4"
            >
              <div className="flex flex-col gap-2.25 md:w-[214px]">
                <label
                  htmlFor="itemName"
                  className="body-variant text-label-text md:hidden"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, "name", e.target.value)}
                  className={`variant-heading-s form-input ${nameError ? "form-input-error" : ""}`}
                />
              </div>

              <div className="mt-6.25 flex items-center justify-between gap-10 md:mt-0 md:flex-1 md:gap-4">
                <div className="flex items-center justify-center gap-4">
                  {/* qty */}
                  <div className="flex flex-col gap-2.25 md:w-11.5">
                    <label
                      htmlFor="qty"
                      className="body-variant text-label-text md:hidden"
                    >
                      Qty.
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdate(item.id, "quantity", Number(e.target.value))
                      }
                      className={`variant-heading-s form-input number-input ${qtyError ? "form-input-error" : ""}`}
                      min={1}
                    />
                  </div>

                  {/* price */}
                  <div className="flex flex-col gap-2.25 md:w-25">
                    <label
                      htmlFor="price"
                      className="body-variant text-label-text md:hidden"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        onUpdate(item.id, "price", Number(e.target.value))
                      }
                      className={`variant-heading-s form-input number-input ${priceError ? "form-input-error" : ""}`}
                      min={0}
                    />
                  </div>

                  {/* total */}
                  <div className="flex flex-col gap-2.25">
                    <label
                      htmlFor="total"
                      className="body-variant text-label-text md:hidden"
                    >
                      Total
                    </label>
                    <p className="variant-heading-s flex h-12 items-center text-06">
                      {(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* delete item */}
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="group -mb-4.5 flex shrink-0 cursor-pointer items-center justify-center"
                >
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z"
                      className="fill-[#888EB0] group-hover:fill-09"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
