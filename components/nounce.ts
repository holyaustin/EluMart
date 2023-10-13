import { Connection, Keypair, LAMPORTS_PER_SOL, NonceAccount, NONCE_ACCOUNT_LENGTH, SystemProgram, Transaction } from "@solana/web3.js";
import { encode, decode } from 'bs58';
import fs from 'fs';

const RPC_URL = 'devnet';
const TRANSFER_AMOUNT = LAMPORTS_PER_SOL * 0.01;

const nonceAuthKeypair = Keypair.generate();
const nonceKeypair = Keypair.generate();
const senderKeypair = Keypair.generate();
const connection = new Connection(RPC_URL);

async function main() {  
    const { useNonce, waitTime } = parseCommandLineArgs();
    console.log(`Attempting to send a transaction using a ${useNonce ? "nonce" : "recent blockhash"}. Waiting ${waitTime}ms before signing to simulate an offline transaction.`)

    try {
        // Step 1 - Fund the nonce authority account
        await fundAccounts([nonceAuthKeypair, senderKeypair]);
        // Step 2 - Create the nonce account
        await createNonce();
        // Step 3 - Create a transaction
        await createTx(useNonce);
        // Step 4 - Sign the transaction offline
        await signOffline(waitTime, useNonce);
        // Step 5 - Execute the transaction
        await executeTx();
    } catch (error) {
        console.error(error);
    }
}

async function fetchNonceInfo() {
    const accountInfo = await connection.getAccountInfo(nonceKeypair.publicKey);
    if (!accountInfo) throw new Error("No account info found");
    const nonceAccount = NonceAccount.fromAccountData(accountInfo.data);
    console.log("      Auth:", nonceAccount.authorizedPubkey.toBase58());
    console.log("      Nonce:", nonceAccount.nonce);
    return nonceAccount;
}

function parseCommandLineArgs() {
    let useNonce = false;
    let waitTime = 120000;

    for (let i = 2; i < process.argv.length; i++) {
        if (process.argv[i] === '-useNonce') {
            useNonce = true;
        } else if (process.argv[i] === '-waitTime') {
            if (i + 1 < process.argv.length) {
                waitTime = parseInt(process.argv[i + 1]);
                i++;
            } else {
                console.error('Error: The -waitTime flag requires an argument');
                process.exit(1);
            }
        } else {
            console.error(`Error: Unknown argument '${process.argv[i]}'`);
            process.exit(1);
        }
    }

    return { useNonce, waitTime };
}

async function encodeAndWriteTransaction(tx: Transaction, filename: string, requireAllSignatures = true) {
    const serialisedTx = encode(tx.serialize({ requireAllSignatures }));
    fs.writeFileSync(filename, serialisedTx);
    console.log(`      Tx written to ${filename}`);
    return serialisedTx;
}

async function readAndDecodeTransaction(filename: string): Promise<Transaction> {
    const transactionData = fs.readFileSync(filename, 'utf-8');
    const decodedData = decode(transactionData);
    const transaction = Transaction.from(decodedData);
    return transaction;
}


async function fundAccounts(accountsToFund: Keypair[]) {
    console.log("---Step 1---Funding accounts");
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const airdropPromises = accountsToFund.map(account => {
        return connection.requestAirdrop(account.publicKey, LAMPORTS_PER_SOL);
    });
    const airDropSignatures = await Promise.all(airdropPromises).catch(error => {
        console.error("Failed to request airdrops: ", error);
        throw error;
    });
    const airdropConfirmations = airDropSignatures.map(signature => {
        return connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'finalized');
    });
    await Promise.all(airdropConfirmations).catch(error => {
        console.error("Failed to confirm airdrops: ", error);
        throw error;
    });
}


async function createNonce() {
    console.log("---Step 2---Creating nonce account");
    const newNonceTx = new Transaction();
    const rent = await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    newNonceTx.feePayer = nonceAuthKeypair.publicKey;
    newNonceTx.recentBlockhash = blockhash;
    newNonceTx.lastValidBlockHeight = lastValidBlockHeight;
    newNonceTx.add(
        SystemProgram.createAccount({
            fromPubkey: nonceAuthKeypair.publicKey,
            newAccountPubkey: nonceKeypair.publicKey,
            lamports: rent,
            space: NONCE_ACCOUNT_LENGTH,
            programId: SystemProgram.programId,
        }),
        SystemProgram.nonceInitialize({
            noncePubkey: nonceKeypair.publicKey,
            authorizedPubkey: nonceAuthKeypair.publicKey,
        })
    );

    newNonceTx.sign(nonceKeypair, nonceAuthKeypair);
    try {
        const signature = await connection.sendRawTransaction(newNonceTx.serialize());
        await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
        });
        console.log("      Nonce Acct Created: ", signature);
    } catch (error) {
        console.error("Failed to create nonce account: ", error);
        throw error;
    }

}

async function createTx(useNonce = false) {
    console.log("---Step 3---Creating transaction");
    const destination = Keypair.generate();
    const transferIx = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: destination.publicKey,
        lamports: TRANSFER_AMOUNT,
    });
    const advanceIx = SystemProgram.nonceAdvance({
        authorizedPubkey: nonceAuthKeypair.publicKey,
        noncePubkey: nonceKeypair.publicKey
    })
    const sampleTx = new Transaction();

    if (useNonce) {
        sampleTx.add(advanceIx, transferIx);
        const nonceAccount = await fetchNonceInfo();
        sampleTx.recentBlockhash = nonceAccount.nonce;
    }
    else {
        sampleTx.add(transferIx);
        sampleTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    }    
    
    sampleTx.feePayer = senderKeypair.publicKey;
    const serialisedTx = encodeAndWriteTransaction(sampleTx, './unsigned.json', false);
    return serialisedTx;
}

async function signOffline(waitTime = 120000, useNonce = false): Promise<string> {
    console.log("---Step 4---Signing transaction offline");
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    const unsignedTx = await readAndDecodeTransaction('./unsigned.json');
    if (useNonce) unsignedTx.sign(nonceAuthKeypair, senderKeypair);
    else unsignedTx.sign(senderKeypair);
    const serialisedTx = encodeAndWriteTransaction(unsignedTx, './signed.json');
    return serialisedTx;
}

async function executeTx() {
    console.log("---Step 5---Executing transaction");
    const signedTx = await readAndDecodeTransaction('./signed.json');
    const sig = await connection.sendRawTransaction(signedTx.serialize());
    console.log("      Tx sent: ", sig);
}

main();