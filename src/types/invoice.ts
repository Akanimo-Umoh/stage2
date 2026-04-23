export type InvoiceStatus = "paid" | "pending" | "draft"

export type InvoiceItem = {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

export type Invoice = {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: InvoiceStatus
  senderAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  items: InvoiceItem[]
  total: number
}

export type FormErrors = {
  senderStreet?: string
  senderCity?: string
  senderPostCode?: string
  senderCountry?: string
  clientName?: string
  clientEmail?: string
  clientStreet?: string
  clientCity?: string
  clientPostCode?: string
  clientCountry?: string
  description?: string
  items?: string
  general?: string
}
