import { mintTo } from '@solana/spl-token';
import 'dotenv/config';
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from '@solana-developers/helpers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment('SECRET_KEY');

// Substitute token address created from createTokenMint.ts
const tokenMintAccount = new PublicKey(
  '3KJTTm8FC1mjrvFDTjNokm92omEamCwwtxMnNofT4W3w'
);

// Substitute the address of the Associated Token Account (ATA) created in createTokenAccount.ts
const tokenAccount = new PublicKey(
  '6T7Gtxh9rWcUhbfZsU8H5oRVbvfww5og1wLAY3KSxLn7'
);

const transaction = await mintTo(
  connection,
  user,
  tokenMintAccount,
  tokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink('transaction', transaction, 'devnet');

console.log('Tokens minted:', link);
