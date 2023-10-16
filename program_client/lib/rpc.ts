// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import * as pda from "./pda";
import * as T from "./types";
import {
    Commitment,
    Connection,
    GetAccountInfoConfig,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature,
} from "@solana/web3.js";
import {deserialize, serialize} from "borsh";


let _programId: PublicKey;
let _connection: Connection;

export const initializeClient = (
    programId: PublicKey,
    connection: Connection
) => {
    _programId = programId;
    _connection = connection;
};

export enum ElumartInstruction {
/**
 * To call once per account. Initialize a Record account. T
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user_record: {@link Record} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - user_name: {@link string} The username to be assigned to the Record.name property
 * - profile_url: {@link string} The user profile url
 * - user_record_seed_signer: {@link PublicKey} Auto-generated, from input user_record of type [Record] set the seed named signer, required by the type
 */
    CreateUser = 0,
}

export type CreateUserArgs = {
    feePayer: PublicKey;
    userName: string;
    profileUrl: string;
    userRecordSeedSigner: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * To call once per account. Initialize a Record account. T
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user_record: {@link Record} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - user_name: {@link string} The username to be assigned to the Record.name property
 * - profile_url: {@link string} The user profile url
 * - user_record_seed_signer: {@link PublicKey} Auto-generated, from input user_record of type [Record] set the seed named signer, required by the type
 */
export const createUser = (args: CreateUserArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
                user_name: "string",
                profile_url: "string",
                user_record_seed_signer: { array: { type: "u8", len: 32 } },
            },
        },
        {
            id: ElumartInstruction.CreateUser,
            user_name: args.userName,
            profile_url: args.profileUrl,
            user_record_seed_signer: args.userRecordSeedSigner.toBytes(),
        }
    );

    const [userRecordPubkey] = pda.deriveRecordPDA({
        signer: args.userRecordSeedSigner,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: userRecordPubkey, isSigner: false, isWritable: true},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * To call once per account. Initialize a Record account. T
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user_record: {@link Record} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - user_name: {@link string} The username to be assigned to the Record.name property
 * - profile_url: {@link string} The user profile url
 * - user_record_seed_signer: {@link PublicKey} Auto-generated, from input user_record of type [Record] set the seed named signer, required by the type
 */
export const createUserSendAndConfirm = async (
    args: Omit<CreateUserArgs, "feePayer"> & { 
        signers: { feePayer: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(createUser({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, ]
    );
};

// Getters

export const getRecord = async (
    publicKey: PublicKey,
    commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
): Promise<T.Record | undefined> => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);

    if (!buffer) {
        return undefined
    }

    if (buffer.data.length <= 0) {
        return undefined
    }

    return T.decodeRecord(deserialize(T.RecordSchema, buffer.data) as Record<string, unknown>);
}


// Websocket Events

