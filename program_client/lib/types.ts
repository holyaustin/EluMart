// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import type {Schema} from 'borsh';
import type {Decoded} from "./utils";
import {PublicKey} from "@solana/web3.js";
import { deserialize } from "borsh";

/// Through this data structure we will store the relevant information to track a given user registering to use the elumart platform.
export interface Record {
  userName: string;
  imageUrl: number;
}

export const decodeRecord = (decoded: Decoded): Record => ({
    userName: decoded["user_name"] as string,
    imageUrl: decoded["image_url"] as number,
});

export const RecordSchema: Schema =  {
    struct: {
        user_name: "string",
        image_url: "u32",
    }
};



