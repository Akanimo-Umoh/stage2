import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home"
import { ViewInvoice } from "./pages/view-invoice"
import Layout from "./components/Layout"
import { InvoiceProvider } from "./context/InvoiceContext"
import ScrollToTop from "./components/ScrollToTop"

export function App() {
  return (
    <Router>
      <InvoiceProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/invoice-details/:id" element={<ViewInvoice />} />
          </Route>
        </Routes>
      </InvoiceProvider>
    </Router>
  )
}

export default App
