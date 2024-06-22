import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import 'dotenv/config';
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from '@solana-developers/helpers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

const user = getKeypairFromEnvironment('SECRET_KEY');

// Pass in public key from token mint account created using createTokenMint.ts
const tokenMintAccount = new PublicKey(
  '3KJTTm8FC1mjrvFDTjNokm92omEamCwwtxMnNofT4W3w'
);

// Create an Associated Token Account (ATA) for your own wallet
const recipient = user.publicKey;

// Create an ATA for someone else's wallet
// const recipient = new PublicKey("PUT_ADDRESS_HERE")

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);

console.log(`Token account: ${tokenAccount.address.toBase58()}`)

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet")

console.log(`Link to created token account: ${link}`)