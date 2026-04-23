import type { Invoice } from "@/types/invoice"
import { format } from "date-fns"

type DetailsProps = {
  invoice: Invoice
}

export default function Details({ invoice }: DetailsProps) {
  return (
    <div className="card-shadow rounded-xl bg-invoice-card-bg p-6 pt-6.25 md:px-8 md:pt-8.25 md:pb-8">
      <div className="flex flex-col gap-7.5 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1 md:gap-1.75">
          <p className="variant-heading-s md:h-full md:leading-6">
            <span className="text-07">#</span>
            {invoice.id}
          </p>
          <p className="body-variant text-details-text">
            {invoice.description}
          </p>
        </div>

        <div>
          <p className="body flex flex-col text-details-text">
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </p>
        </div>
      </div>

      <div className="mt-7.75 md:mt-5.25 md:flex md:max-w-131 md:justify-between">
        <div className="flex gap-10 md:w-full md:justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3.25">
              <p className="body-variant text-details-text">Invoice Date</p>
              <p className="text-heading-s leading-5">
                {format(new Date(invoice.createdAt), "dd MMM yyyy")}
              </p>
            </div>

            <div className="flex flex-col gap-3.25">
              <p className="body-variant text-details-text">Payment Due</p>
              <p className="text-heading-s leading-5">
                {format(new Date(invoice.paymentDue), "dd MMM yyyy")}
              </p>
            </div>
          </div>

          <div>
            <p className="body-variant text-details-text">Bill To</p>
            <p className="text-heading-s mt-3.25 leading-5">
              {invoice.clientName}
            </p>
            <p className="body mt-1.75 flex flex-col text-details-text">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </p>
          </div>

          <div className="mt-8 hidden md:m-0 md:block">
            <p className="body-variant text-details-text">Sent to</p>
            <p className="text-heading-s mt-3.25 leading-5">
              {invoice.clientEmail}
            </p>
          </div>
        </div>

        {/* mobile screen: sent to */}
        <div className="mt-8 md:m-0 md:hidden">
          <p className="body-variant text-details-text">Sent to</p>
          <p className="text-heading-s mt-3.25 leading-5">
            {invoice.clientEmail}
          </p>
        </div>
      </div>

      {/* amount charged */}
      <div className="mt-9.5 md:mt-11.75">
        <div className="flex flex-col gap-6 rounded-t-xl bg-price-ctn px-6 pt-6.25 pb-5.75 md:px-8 md:pt-8.25 md:pb-9.75">
          {/* mobile version */}
          {invoice.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2.5 md:hidden"
            >
              <div className="flex min-w-0 flex-col gap-2">
                <p className="variant-heading-s wrap-break-word">{item.name}</p>
                <p className="variant-heading-s text-price-text">
                  {item.quantity} x £ {item.price.toFixed(2)}
                </p>
              </div>

              <p className="variant-heading-s shrink-0">
                £ {item.total.toFixed(2)}
              </p>
            </div>
          ))}

          {/* md version */}
          <div className="hidden md:flex md:flex-col">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="body w-1/2 text-left font-normal text-07">
                    Item Name
                  </th>
                  <th className="body w-1/6 text-center font-normal text-07">
                    QTY.
                  </th>
                  <th className="body w-1/6 text-right font-normal text-07">
                    Price
                  </th>
                  <th className="body w-1/6 text-right font-normal text-07">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="variant-heading-s pt-8 pr-4 wrap-break-word">
                      {item.name}
                    </td>
                    <td className="variant-heading-s pt-8 text-center text-07">
                      {item.quantity}
                    </td>
                    <td className="variant-heading-s pt-8 text-right text-07">
                      £ {item.price.toFixed(2)}
                    </td>
                    <td className="variant-heading-s pt-8 text-right">
                      £ {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* grand total */}
        <div className="flex items-center justify-between rounded-b-xl bg-total-ctn px-6 pt-6.5 pb-5.5 md:px-8 md:pt-6.75 md:pb-5.25">
          <p className="body text-white">Grand Total</p>
          <p className="text-[24px] leading-8 tracking-[-0.5px] text-white">
            £ {invoice.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
