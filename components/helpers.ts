import { Elusiv, SEED_MESSAGE } from "@elusiv/sdk";
import { sign } from "@noble/ed25519";
import  { Connection, Keypair } from "@solana/web3.js";
//import * as web3 from "@solana/web3.js";
//import { getPhantomWallet } from "@solana/wallet-adapter-wallets";

export async function getParams(): Promise<{
  elusiv: Elusiv;
  keyPair: Keypair;
  connection: Connection;
}> {
  const connection = new Connection("https://api.devnet.solana.com");
  // Add your own private key here
  const keyPair = Keypair.fromSecretKey(
    new Uint8Array([
      202, 171, 192, 129, 150, 189, 204, 241, 142, 71, 205, 2, 81, 97, 2, 176, 48,
  81, 45, 1, 96, 138, 220, 132, 231, 131, 120, 77, 66, 40, 97, 172, 91, 245, 84,
  221, 157, 190, 9, 145, 176, 130, 25, 43, 72, 107, 190, 229, 75, 88, 191, 136,
  7, 167, 109, 91, 170, 164, 186, 15, 142, 36, 12, 23,
    ])
  );
/**
  const wallet = getPhantomWallet();
  const adapter = wallet.adapter();
  await adapter.connect();
  if (adapter.connected && adapter.publicKey != null)
  {
    const mintPublicKey = new web3.PublicKey(this.props.nft.data.mint);
  }
*/
  
  const seed = getSignedSeed(keyPair);
  console.log(seed);

  const elusiv = await Elusiv.getElusivInstance(
    seed,
    keyPair.publicKey,
    connection,
    "devnet"
  );

  return {
    elusiv,
    keyPair,
    connection,
  };
}

function getSignedSeed(keyPair: Keypair) {
    return sign(
      Buffer.from(SEED_MESSAGE, "utf-8"),
      keyPair.secretKey.slice(0, 32)
    );
};