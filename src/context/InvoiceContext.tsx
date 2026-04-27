import { createContext, useContext, useEffect, useState } from "react"
import type { Invoice } from "@/types/invoice"
import seedData from "@/data/invoices.json"

const STORAGE_KEY = "invoices"

type InvoiceContextType = {
  invoices: Invoice[]
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (invoice: Invoice) => void
  deleteInvoice: (id: string) => void
  markAsPaid: (id: string) => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    // load seed from JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
    return seedData as Invoice[]
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices))
  }, [invoices])

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev])
  }

  const updateInvoice = (updated: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === updated.id ? { ...inv, status: "pending", updated } : inv
      )
    )
  }

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id))
  }

  const markAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv))
    )
  }

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInvoices() {
  const context = useContext(InvoiceContext)
  if (!context)
    throw new Error("useInvoices must be used within InvoiceProvider")
  return context
}
