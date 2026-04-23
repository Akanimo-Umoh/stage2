import { useTheme } from "@/components/theme-provider"
import logoImg from "@/assets/img-logo.png"
// import darkIcon from "@/assets/icon-dark-variant.svg"
import avatarImg from "@/assets/img-avatar.png"

import { Link } from "react-router-dom"

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
        className="fill-07 group-hover:fill-05"
      />
    </svg>
  )
}

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 right-0 left-0 z-100 h-18 bg-[#373B53] transition-transform duration-300 ease-in-out md:h-20 lg:h-full lg:w-25.75 lg:rounded-r-4xl dark:bg-[#1E2139]">
      <div className="flex h-full items-center justify-between lg:flex-col">
        <div className="flex h-full flex-1 items-center justify-between pr-6 md:pr-8 lg:flex-col lg:p-0 lg:pb-7.75">
          <Link
            to="/"
            className="flex h-full w-18 shrink-0 items-center justify-center rounded-r-4xl md:w-20 lg:h-25.75 lg:w-25.75"
          >
            <img src={logoImg} alt="logo" className="md:h-full md:w-full" />
          </Link>

          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="group cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <div className="h-5 w-5 shrink-0 rounded-full bg-[#858BB2] hover:bg-05" />
            ) : (
              <MoonIcon className="group-hover:fill-05" />
            )}
          </button>
        </div>

        <div className="flex h-full items-center justify-center border-l border-[#494E6E] px-6 md:px-8 lg:h-fit lg:w-full lg:border-t lg:border-l-0 lg:p-0 lg:py-6">
          <img
            src={avatarImg}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full lg:h-10 lg:w-10"
          />
        </div>
      </div>
    </nav>
  )
}
