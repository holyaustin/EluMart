import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import artifacts from './idl.json';

export const SOLANA_HOST = clusterApiUrl('devnet')


export const MUSIKMART_PROGRAM_ID = new PublicKey(
  "9P8wQVP39pAauwbh9y1zv34sdcreXsdLeeojv4hrWc7W"
)

export const MUSIKMART_IDL = artifacts;