import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <div className="min-h-screen bg-background lg:flex custom-scrollbar">
      <Navbar />

      <main className="pt-18 md:pt-20 lg:flex lg:flex-1 lg:justify-center lg:pt-0">
        <div className="w-full lg:h-full lg:max-w-182.5">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
