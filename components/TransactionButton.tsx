import { useWallet } from '../(hooks)/useWallet';
import { Button } from '@chakra-ui/react';

export const TransactionForm = () => {
  const { connectWallet, executeTransaction } = useWallet();

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold text-center">Execute Transaction</h2>
      <div className="text-center mt-8">
        <Button colorScheme="teal" onClick={connectWallet}>Connect Wallet</Button>
        <Button colorScheme="blue" onClick={executeTransaction} className="ml-4">Send Assets to Contract</Button>
      </div>
    </div>
  );
};
