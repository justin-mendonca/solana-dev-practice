import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

// Substitute token address created from createTokenMint.ts
const tokenMintAccount = new PublicKey(
    '3KJTTm8FC1mjrvFDTjNokm92omEamCwwtxMnNofT4W3w'
  );

const recipient = new PublicKey("6e8qofCcBNouShdQ1xHwU8mF7DpRd2kkXJJx9582Yjj2")

const senderATA = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMintAccount, sender.publicKey)

const recipientATA = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMintAccount, recipient)

const link = getExplorerLink("address", recipientATA.address.toBase58(), "devnet")

console.log("View recipient token account on explorer:", link)

const transaction = await transfer(connection, sender, senderATA.address, recipientATA.address, sender, 9.9 * MINOR_UNITS_PER_MAJOR_UNITS)

const txLink = getExplorerLink("transaction", transaction, "devnet")

console.log(`Tokens sent to recipient ${recipient}: ${txLink}`)