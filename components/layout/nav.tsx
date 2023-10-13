import { FlameIcon, GithubIcon, ImageIcon, ImagePlusIcon, TreePineIcon, TruckIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Typography } from "@/components/ui/typography"
import { Routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { cn } from "@/utils/cn"
import { IconButton } from "../ui/icon-button"

export const NavItems = [
  {
    text: "Home",
    href: Routes.INDEX,
    icon: <FlameIcon />,
  },
  {
    text: "NFT Marketplace",
    href: Routes.MART,
    icon: <TruckIcon />,
  },
  {
    text: "Merkle Tree",
    href: Routes.TREE,
    icon: <TreePineIcon />,
  },
  {
    text: "Mint cNFT",
    href: Routes.MINT_NFT,
    icon: <ImagePlusIcon />,
  },
  {
    text: "Your NFTs",
    href: Routes.VIEW_NFTS,
    icon: <ImageIcon />,
  },
  {
    text: "Transfer NFT",
    href: Routes.TRANSFER_NFT,
    icon: <TruckIcon />,
  },
  {
    text: "Burn NFT",
    href: Routes.BURN_NFT,
    icon: <FlameIcon />,
  },
]

export const Navigation = () => {
  const { asPath } = useRouter()

  return (
    <nav className="hidden w-[280px] shrink-0 lg:block bg-blue-900">
      <div className="fixed flex flex-col left-0 top-0 z-0 h-full w-[280px] overflow-y-auto border-r border-dashed border-r-gray-500/24">
        <div className="mb-4 px-5 py-6">
          <a href="/" className="font-bold">
            <img src="/images/headphone2.jpeg" className="h-20 w-20 rounded-md" />
          </a>
        </div>
        <div className="text-2xl font-bold items-start justify-left p-6"> 
          EluMart 
          </div>
        <div className="flex h-96 flex-col">
          <ul className="relative px-4">
            {NavItems.map((item) => (
              <NavItem
                key={item.text}
                text={item.text}
                href={item.href}
                selected={asPath === item.href}
                icon={item.icon}
              />
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col justify-end items-center">
          <div className="flex items-center gap-4 p-6">
            <IconButton color="primary" as="a" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </IconButton>
            <IconButton
              color="primary"
              as="a"
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary" as="a" href="https://elumart.vercel.app//" target="_blank" rel="noopener noreferrer">
              <img className="h-6 w-auto object-contain" src="/images/headphone2.jpeg" />
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  )
}

type NavItemProps = {
  text: string
  href: string
  selected?: boolean
  icon?: React.ReactNode
}

export const NavItem = ({ text, href, selected, icon }: NavItemProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "mb-2 flex h-12 cursor-pointer select-none items-center justify-start gap-2 rounded-lg py-2 pl-3 pr-4",
          { "bg-primary-500/8": selected },
          { "hover:bg-gray-500/8": !selected }
        )}
      >
        <span
          className={cn("h-6 w-6 rounded-full", {
            "text-primary-300": selected,
            "text-white": !selected,
          })}
        >
          {icon}
        </span>
        <Typography
          level="body4"
          className={cn("font-semibold", {
            "text-primary-300": selected,
            "text-white": !selected,
          })}
        >
          {text}
        </Typography>
      </div>
    </Link>
  )
}
