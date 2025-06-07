import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";
import bs58 from "bs58";

interface propTypes {
  isSolana: boolean;
  pubKey: string;
  privKey: string;
  onClose: () => void; // 👈 close modal handler
}

export const TransactionModal = ({
  isSolana,
  pubKey,
  privKey,
  onClose,
}: propTypes) => {
  const [receiverPubKey, setReceiverPubKey] = useState("");
  const [sendingAmount, setSendingAmount] = useState<number | "">("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const addTransaction = async () => {
    try {
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );
      const senderKeypair = Keypair.fromSecretKey(bs58.decode(privKey));
      const receiverPublicKey = new PublicKey(receiverPubKey);

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: receiverPublicKey,
          lamports: Number(sendingAmount) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = senderKeypair.publicKey;

      const sig = await sendAndConfirmTransaction(connection, tx, [
        senderKeypair,
      ]);
      console.log("✅ Signature:", sig);
      alert("Transaction Sent ✅");
      onClose();
    } catch (err) {
      console.error("❌ Transaction failed:", err);
      alert("Transaction Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-0 text-neutral-300 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center text-zinc-900 dark:text-white">
          {isSolana ? "Send SOL" : "Send ETH"}
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="receiver"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Receiver Address
          </label>
          <input
            id="receiver"
            type="text"
            value={receiverPubKey}
            onChange={(e) => setReceiverPubKey(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter receiver public key"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Amount ({isSolana ? "SOL" : "ETH"})
          </label>
          <input
            id="amount"
            type="number"
            value={sendingAmount}
            onChange={(e) => setSendingAmount(parseFloat(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount to send"
          />
        </div>

        <button
          onClick={addTransaction}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};
