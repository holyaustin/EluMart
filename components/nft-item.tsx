import { SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { Network, Nft } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { getParams } from "./helpers";
import { Elusiv, TokenType } from "@elusiv/sdk";
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

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

// Add a recipient public key here
const recipient = new PublicKey("6UadoV4WxF64tsSpCcHzCZEbjFxPCoogx4wbESywcsxM");

export function NFTItem({ nft, network }: NFTItemProps) {
  const [balance, setBalance] = useState(BigInt(0));
  const [isLoading, setIsLoading] = useState(true);
  const [elusiv, setElusiv] = useState<Elusiv>(null);
  const [keyPair, setKeyPair] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [connection, setConnection] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const setParams = async () => {
      const { elusiv: e, keyPair: kp, connection: conn } = await getParams();
      setElusiv(e);
      setKeyPair(kp);
      setConnection(conn);
	  // toast.info("Instantiated Elusiv");
      setIsLoading(false);
    };

    setParams();
  }, []);

  const topup = async (
    elusivInstance: Elusiv,
    keyPair: Keypair,
    amount: number,
    tokenType: TokenType
  ) => {
    // Build our topup transaction
    console.log("Top Transaction called");
    const topupTx = await elusivInstance.buildTopUpTx(amount, tokenType);
    // Sign it (only needed for topups, as we're topping up from our public key there)
    topupTx.tx.partialSign(keyPair);
    // Send it off
    return elusivInstance.sendElusivTx(topupTx);
  };

  const send = async (
    elusivInstance: Elusiv,
    recipient: PublicKey,
    amount: number,
    tokenType: TokenType
  ) => {
    // Build the send transaction
    console.log("send Transaction called");
    const sendTx = await elusivInstance.buildSendTx(
      amount,
      recipient,
      tokenType
    );
    // Send it off!
    return elusivInstance.sendElusivTx(sendTx);
  };

  useEffect(() => {
    const getBalance = async () => {
      //toast.info("Fetching private balance...");
      console.log("Fetching private balance...");
      const privateBalance = await elusiv.getLatestPrivateBalance("LAMPORTS");
      //toast.success("Fetched private balance!");
      console.log("Fetched private balance!");
      setBalance(privateBalance);
      setFetching(false);
    };

    if (elusiv !== null) {
      getBalance().then(() => toast.success("Balance updated"));
    }
  }, [elusiv]);

  const topupHandler = async (e) => {
    e.preventDefault();
    //toast.info("Initiating topup...");
    //console.log("Topup handler");
    const sig = await topup(
      elusiv,
      keyPair,
      LAMPORTS_PER_SOL,
      "LAMPORTS"
    );
    // toast.success(`Topup complete with sig ${sig.signature}`);
    console.log(`Topup complete with sig ${sig.signature}`);
  };

  const sendHandler = async (e) => {
    e.preventDefault();
	setIsSending(true);
    if (balance > BigInt(0)) {
		// Send half a SOL
		toast.info("Sending...");
		const sig = await send(
			elusiv,
			recipient,
			0.5 * LAMPORTS_PER_SOL,
			"LAMPORTS"
		);
		toast.success(`Send complete with sig ${sig.signature}`);
	}
  };


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
          onClick={(e) => sendHandler(e)} disabled={isLoading || balance <= 0 || isSending}
            >
              Collect
       </button>
       <ToastContainer autoClose={5000} />
       
       {/**
      <p>
        Connected to {isLoading ? "Loading..." : keyPair?.publicKey.toString()}
      </p>
      <p>
        Private Balance:{" "}
        {fetching ? "Loading..." : `${Number(balance) / LAMPORTS_PER_SOL} SOL`}
      </p>
      <button onClick={(e) => topupHandler(e)} disabled={isLoading}>
        Topup
      </button> {" "}
      <button onClick={(e) => sendHandler(e)} disabled={isLoading || balance <= 0 || isSending}>
        Send
       </button>
        */}
	

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
