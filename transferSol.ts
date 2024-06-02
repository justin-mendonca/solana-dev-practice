import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

(async () => {
    const keypair = getKeypairFromEnvironment('SECRET_KEY');
    const connection = new Connection(clusterApiUrl('devnet'));

    const transferSol = async (targetAddress: string, amount: number) => {
        const transaction = new Transaction();

        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: new PublicKey(targetAddress),
            lamports: amount * LAMPORTS_PER_SOL
        });

        transaction.add(sendSolInstruction);

        const res = await sendAndConfirmTransaction(connection, transaction, [keypair]);
        
        return res;
    }

    const transactionId = await transferSol('9ww9QzjqC8FN6dqsk5JH6jMc3QMXYiL7utUEn6Skuhbz', 0.1);
    console.log(transactionId);
})();
