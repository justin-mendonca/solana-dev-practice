import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const transferSol = async () => {
  const suppliedToPubkey = process.argv[2] || null;
  const solToSend = Number(process.argv[3]) || null;

  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  if (!solToSend) {
    console.log(`Please enter a valid amount of SOL to send`);
    process.exit(1);
  }

  const toPubkey = new PublicKey(suppliedToPubkey);
  const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
  const connection = new Connection(clusterApiUrl('devnet'));

  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubkey,
    lamports: solToSend * LAMPORTS_PER_SOL,
  });

  transaction.add(sendSolInstruction);

  try {
    const startTime = Date.now();
    const txid = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);

    const endTime = Date.now();

    const durationInSeconds = (endTime - startTime) / 1000;

    console.log('Transaction ID:', txid);
    console.log(`Transaction took ${durationInSeconds} seconds to complete.`);

    const transactionInfo = await connection.getParsedTransaction(txid)

    if (transactionInfo && transactionInfo.meta && transactionInfo.meta.fee) {
        const feeInSol = transactionInfo.meta.fee / LAMPORTS_PER_SOL
        
        console.log('Transaction fee in SOL:', feeInSol)
    }
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

transferSol();
