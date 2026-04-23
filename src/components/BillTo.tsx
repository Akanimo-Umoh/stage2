import { DatePicker } from "@/components/DatePicker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormErrors } from "@/types/invoice"
import { FormLabel } from "./FormLabel"

type BillToProps = {
  clientName: string
  onClientNameChange: (v: string) => void
  clientEmail: string
  onClientEmailChange: (v: string) => void
  clientStreet: string
  onClientStreetChange: (v: string) => void
  clientCity: string
  onClientCityChange: (v: string) => void
  clientPostCode: string
  onClientPostCodeChange: (v: string) => void
  clientCountry: string
  onClientCountryChange: (v: string) => void
  invoiceDate: Date
  onInvoiceDateChange: (d: Date) => void
  paymentTerms: number
  onPaymentTermsChange: (n: number) => void
  description: string
  onDescriptionChange: (v: string) => void
  errors: FormErrors
}

const termOptions = [
  { value: "1", label: "Net 1 Day" },
  { value: "7", label: "Net 7 Days" },
  { value: "14", label: "Net 14 Days" },
  { value: "30", label: "Net 30 Days" },
]

export default function BillTo({
  clientName,
  onClientNameChange,
  clientEmail,
  onClientEmailChange,
  clientStreet,
  onClientStreetChange,
  clientCity,
  onClientCityChange,
  clientPostCode,
  onClientPostCodeChange,
  clientCountry,
  onClientCountryChange,
  invoiceDate,
  onInvoiceDateChange,
  paymentTerms,
  onPaymentTermsChange,
  description,
  onDescriptionChange,
  errors,
}: BillToProps) {
  return (
    <div>
      <p className="variant-heading-s text-01">Bill To</p>

      <div className="mt-6">
        {/* clients name */}
        <div className="flex flex-col gap-2.25">
          <FormLabel
            htmlFor="clientName"
            label="Client's Name"
            error={errors.clientName}
          />

          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => onClientNameChange(e.target.value)}
            className={`variant-heading-s form-input ${errors.clientName ? "form-input-error" : ""}`}
          />
        </div>

        {/* cients email */}
        <div className="mt-[25px] flex flex-col gap-2.25">
          <FormLabel
            htmlFor="clientEmail"
            label="Client's Email"
            error={errors.clientEmail}
          />

          <input
            type="text"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => onClientEmailChange(e.target.value)}
            placeholder="e.g. email@example.com"
            className={`variant-heading-s form-input ${errors.clientEmail ? "form-input-error" : ""}`}
          />
        </div>

        {/* clients street address */}
        <div className="mt-[25px] flex flex-col gap-2.25">
          <FormLabel
            htmlFor="clientStreet"
            label="Street Address"
            error={errors.clientStreet}
          />

          <input
            type="text"
            id="clientStreet"
            value={clientStreet}
            onChange={(e) => onClientStreetChange(e.target.value)}
            className={`variant-heading-s form-input ${errors.clientStreet ? "form-input-error" : ""}`}
          />
        </div>

        <div className="mt-[25px] md:flex md:items-center md:justify-between md:gap-6">
          {/* city and post code */}
          <div className="flex items-center justify-between gap-5.75 md:gap-6">
            <div className="flex w-full flex-col gap-2.25">
              <FormLabel
                htmlFor="clientCity"
                label="City"
                error={errors.clientCity}
              />

              <input
                type="text"
                id="clientCity"
                value={clientCity}
                onChange={(e) => onClientCityChange(e.target.value)}
                className={`variant-heading-s form-input ${errors.clientCity ? "form-input-error" : ""}`}
              />
            </div>

            <div className="flex w-full flex-col gap-2.25">
              <FormLabel
                htmlFor="clientPostCode"
                label="Post Code"
                error={errors.clientPostCode}
              />

              <input
                type="text"
                id="clientPostCode"
                value={clientPostCode}
                onChange={(e) => onClientPostCodeChange(e.target.value)}
                className={`variant-heading-s form-input ${errors.clientPostCode ? "form-input-error" : ""}`}
              />
            </div>
          </div>

          {/* clients country */}
          <div className="mt-[25px] flex flex-col gap-2.25 md:mt-0">
            <FormLabel
              htmlFor="clientCountry"
              label="Country"
              error={errors.clientCountry}
            />

            <input
              type="text"
              id="clientCountry"
              value={clientCountry}
              onChange={(e) => onClientCountryChange(e.target.value)}
              className={`variant-heading-s form-input ${errors.clientCountry ? "form-input-error" : ""}`}
            />
          </div>
        </div>

        <div className="mt-[41px] md:mt-[49px] md:flex md:items-center md:justify-between md:gap-6">
          {/* invoice date */}
          <div className="flex w-full flex-col gap-2.25">
            <label
              htmlFor="invoiceDate"
              className="body-variant text-label-text"
            >
              Invoice Date
            </label>
            {/* <input
              type="date"
              id="invoiceDate"
              className="variant-heading-s form-input"
              placeholder="21 Aug 2021"
            /> */}

            <DatePicker date={invoiceDate} onDateChange={onInvoiceDateChange} />
          </div>

          {/* payment terms */}
          <div className="mt-[25px] flex w-full flex-col gap-2.25 md:m-0">
            <label htmlFor="terms" className="body-variant text-label-text">
              Payment Terms
            </label>
            {/* <input
                      type="text"
                      id="terms"
                      className="variant-heading-s form-input"
                    /> */}
            <Select
              value={String(paymentTerms)}
              onValueChange={(v) => onPaymentTermsChange(Number(v))}
            >
              <SelectTrigger className="variant-heading-s form-input cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-04">
                <SelectGroup>
                  {termOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="variant-heading-s h-[45px] cursor-pointer select-test"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-[25px] flex flex-col gap-2.25">
          <FormLabel
            htmlFor="description"
            label="Project Description"
            error={errors.description}
          />

          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className={`variant-heading-s form-input ${errors.description ? "form-input-error" : ""}`}
            placeholder="e.g. Graphic Design Service"
          />
        </div>
      </div>
    </div>
  )
}
