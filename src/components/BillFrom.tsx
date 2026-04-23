import type { FormErrors } from "@/types/invoice"
import { FormLabel } from "./FormLabel"

type BillFromProps = {
  street: string
  onStreetChange: (v: string) => void
  city: string
  onCityChange: (v: string) => void
  postCode: string
  onPostCodeChange: (v: string) => void
  country: string
  onCountryChange: (v: string) => void
  errors: FormErrors
}

export default function BillFrom({
  street,
  onStreetChange,
  city,
  onCityChange,
  postCode,
  onPostCodeChange,
  country,
  onCountryChange,
  errors,
}: BillFromProps) {
  return (
    <div>
      <p className="variant-heading-s mx-6 text-01 md:mx-14 md:mr-6">
        Bill From
      </p>

      {/* bill form */}
      <div className="mx-6 mt-6 md:mx-14 md:mr-6">
        {/* street address */}
        <div className="flex flex-col gap-2.25">
          <FormLabel
            htmlFor="senderStreet"
            label="Street Address"
            error={errors.senderStreet}
          />

          <input
            type="text"
            id="senderStreet"
            value={street}
            onChange={(e) => onStreetChange(e.target.value)}
            className={`variant-heading-s form-input ${errors.senderStreet ? "form-input-error" : ""}`}
          />
        </div>

        <div className="mt-[25px] md:flex md:items-center md:justify-between md:gap-6">
          {/* city and post code */}
          <div className="flex items-center justify-between gap-5.75 md:gap-6">
            <div className="flex w-full flex-col gap-2.25">
              <FormLabel
                htmlFor="senderCity"
                label="City"
                error={errors.senderCity}
              />

              <input
                type="text"
                id="senderCity"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className={`variant-heading-s form-input ${errors.senderCity ? "form-input-error" : ""}`}
              />
            </div>

            <div className="flex w-full flex-col gap-2.25">
              <FormLabel
                htmlFor="senderPostCode"
                label="Post Code"
                error={errors.senderPostCode}
              />

              <input
                type="text"
                id="senderPostCode"
                value={postCode}
                onChange={(e) => onPostCodeChange(e.target.value)}
                className={`variant-heading-s form-input ${errors.senderPostCode ? "form-input-error" : ""}`}
              />
            </div>
          </div>

          {/* country */}
          <div className="mt-[25px] flex flex-col gap-2.25 md:m-0">
            <FormLabel
              htmlFor="senderCountry"
              label="Country"
              error={errors.senderCountry}
            />

            <input
              type="text"
              id="senderCountry"
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              className={`variant-heading-s form-input ${errors.senderCountry ? "form-input-error" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
