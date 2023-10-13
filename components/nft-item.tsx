import { SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
// import { explorerURL, printConsoleSeparator } from "@/libs/helpers";
// import { payer, testWallet, connection, STATIC_PUBLICKEY } from "@/libs/vars";
import { Network, Nft } from "@/types"


type NFTItemProps = {
  nft: Nft
  network: Network
}
const responsiveIframe = {
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  width: "100%",
  height: "100%",
} as const;

export function NFTItem({ nft, network }: NFTItemProps) {

 return (
    <>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <a
      href={`https://translator.shyft.to/address/${nft.mint}?cluster=${network}&compressed=true`}
      target="_blank"
      rel="noopener noreferrer"
    >
        <AspectRatio>
          <iframe 
            title={nft.name}
            style={responsiveIframe} 
            src={nft.cached_image_uri ?? nft.image_uri}
            className="w-full h-auto object-contain aspect-video" 
            //alt={nft.name} 
            />
        </AspectRatio>
        

        <div className="p-5 w-full">
          <Typography className="mb-2 font-semibold">{nft.name}</Typography>
          <Typography as="p" color="secondary" level="body4" className="line-clamp-2 text-ellipsis">
            {nft.description}
          </Typography>
          <Typography className="mb-2 font-semibold">{nft.royalty}  SOL</Typography>

        </div>
        </a>
        <button
              type="button"
          className="flex flex-row justify-center items-center  w-full my-2 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white border-2 border-x-red-500 text-xl"
          //onSubmit={ sendsol()}
            >
              Collect
          </button>
      </div>
    </>
  )
}

export function NFTItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <AspectRatio>
        <Skeleton className="h-full w-full" />
      </AspectRatio>
      <div className="p-5">
        <Skeleton className="mb-2 h-5 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
