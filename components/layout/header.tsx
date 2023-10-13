import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/utils/cn"
import ConnectWalletButton from "../connect-wallet-button"
import { NavigationMobile } from "./nav-mobile"

export const Header = () => {
  const [small, setSmall] = useState(false)

  useEffect(() => {
    function handler() {
      setSmall(window.pageYOffset > 60)
    }

    window.addEventListener("scroll", handler)

    return () => {
      window.removeEventListener("scroll", handler)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-[40] h-16 w-full bg-white/80 backdrop-blur-sm transition-[height] duration-200 ease-in-out lg:h-24 lg:w-[calc(100%-281px)]",
        { "lg:h-[60px]": small }
      )}
    >
      <div className="relative flex h-full min-h-[56px] items-center px-4 md:min-h-[64px] md:px-6 lg:px-10 bg-blue-900">
        <NavigationMobile
          trigger={
            <IconButton className="mr-2 lg:hidden" size="sm">
              <MenuIcon />
            </IconButton>
          }
        />
        <div className="mb-4 px-5 py-6">
          <a href="/" className="font-bold">
            <img src="/images/headphone2.jpeg" className="h-16 w-16 rounded-md" />
          </a>
        </div>
        <div className="text-2xl font-bold items-start justify-left p-6"> 
          EluMart 
          </div>
          <div className="text-2xl font-bold items-start justify-left"> 
          
          <ul className="text-2xl font-bold  mb-6 flex flex-wrap items-center text-white sm:mb-0">
            <li>
              <a href="/marketplace" className="mr-4 hover:underline md:mr-6 ">
              EXPLORE
              </a>
            </li>
          
            <li>
              <a href="https://discord.com/" target="_blank" className="hover:underline">
                COMMUNITY
              </a>
            </li>
          </ul>
          </div>
        <div className="flex grow items-center justify-end gap-2">

          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
}
