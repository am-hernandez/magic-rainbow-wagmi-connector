import { parseEther } from "ethers/lib/utils.js";
import { useState } from "react";
import {
  useSendTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";

const SendTransaction = () => {
  const [address, setAddress] = useState("0x8bdCE5551B544AF8dFfB09Ff34c34da7FC241Bd0");
  const [amount, setAmount] = useState("0.0001");

  // Note: The debounced values are for UI purposes, such as validation or UI updates,
  // and shouldn't be used directly for sending transactions on form submit.
  const [debouncedAddress] = useDebounce(address, 500);
  const [debouncedAmount] = useDebounce(amount, 500);

  const { data: hash, sendTransaction, isLoading, isSuccess, error } = useSendTransaction();

  const handleSubmit = async (e) => {
    e.preventDefault();

    sendTransaction({
      to: debouncedAddress, // Make sure this is the recipient's address
      value: parseEther(debouncedAmount), // Convert the amount to the necessary format
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="wallet-action-container">
        <input
          value={address}
          placeholder="Receiving Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          value={amount}
          placeholder="Amount of ETH"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          disabled={isLoading || !address || !amount}
          type="submit"
        >
          {isLoading ? "Sending..." : "Send Transaction"}
        </button>
      </form>
      {hash && <div className="message-status">Transaction Hash: {hash}</div>}
        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
    </div>
  );
};

export default SendTransaction;
