import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
  } from '@solana/web3.js';
  import 'dotenv/config';
  import { getKeypairFromEnvironment } from '@solana-developers/helpers';
  import { getDomainKeySync } from '@bonfida/spl-name-service';
  
  const checkDevnetBalance = async () => {
    const keypair = getKeypairFromEnvironment('SECRET_KEY');
    const connection = new Connection(clusterApiUrl('devnet'));
    const balance = await connection.getBalance(keypair.publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    console.log(
      `Finished: The devnet balance of address ${keypair.publicKey} is ${solBalance} SOL`
    );
  };
  
  checkDevnetBalance();
  
  function isValidBase58SolanaAddress(address: string) {
      const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
      return address.length === 44 && base58Regex.test(address);
  }
  
  const checkBalance = async (address: string) => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
      if (isValidBase58SolanaAddress(address)) {
          const publicKey = new PublicKey(address)
          const balance = await connection.getBalance(publicKey)
          const solBalance = balance / LAMPORTS_PER_SOL;
          console.log(
              `Finished: The balance of address ${publicKey} is ${solBalance} SOL`
            );
      }
      else {
          const keypair = getDomainKeySync(address)
          const balance = await connection.getBalance(keypair.pubkey)
          const solBalance = balance / LAMPORTS_PER_SOL
          console.log(
              `Finished: The balance of address ${keypair.pubkey} is ${solBalance} SOL`
            );
      }
  };
  
  checkBalance('toly.sol');