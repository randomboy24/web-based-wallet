"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { WalletGenerator } from "./walletGenerator";
import { MnemonicModal } from "./MnemonicModal";
import { Spinner } from "./Spinner";
import { X } from "lucide-react";

interface propTypes {
  isSolana: boolean;
  setIsSolana: Dispatch<SetStateAction<boolean>>;
}

export const SeedGenerator = ({ isSolana, setIsSolana }: propTypes) => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [seed, setSeed] = useState<Buffer>(Buffer.alloc(0));
  const [isWalletGenerated, setIsWalletGenerated] = useState(false);
  const [isMnemonicModalOpen, setIsMnemonicModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImportingMnemonic, setIsImportingMnemonic] = useState(false);
  const [importMnemonic, setImportMnemonic] = useState<string[]>(
    Array(12).fill("")
  );

  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic");
    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
      setSeed(mnemonicToSeedSync(storedMnemonic));
      setIsWalletGenerated(true);
    }
    setIsLoading(false);
    if (localStorage.getItem("isSolana") == "true") {
      setIsSolana(true);
    }
  }, [setIsSolana]);

  const generateWallet = () => {
    const newMnemonic = generateMnemonic();
    const newSeed = mnemonicToSeedSync(newMnemonic);

    setMnemonic(newMnemonic);
    setSeed(newSeed);
    setIsWalletGenerated(true);

    localStorage.setItem("mnemonic", newMnemonic);
    // console.log("mnemonic is : " + newMnemonic+"\n" + typeof(mnemonic));
  };

  const numOfWordsInMnemonic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="">
      {isImportingMnemonic ? (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex flex-col justify-center items-center text-white">
          <div className="flex flex-col border-2 border-gray-800 bg-[#222] md:w-[420px] w-[300px] items-center rounded-xl ">
            <div className="w-[100%]">
              <X
                className="text-gray-300 bg-red-900 rounded-sm hover:cursor-pointer float-right"
                onClick={() => setIsImportingMnemonic(false)}
              />
            </div>
            <div className=" mt-2 text-white text-2xl text-center ">
              Secret Recovery Phase
            </div>
            <div className=" my-2 text-gray-500 text-lg  text-center">
              Import an existing wallet with your 12 word secret recovery phase.
            </div>
            <div className=" my-4 grid grid-cols-3 grid-rows-4">
              {numOfWordsInMnemonic.map((num) => {
                return (
                  <input
                    className="mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 md:w-24 md:h-10 w-20 h-8 rounded-lg"
                    placeholder={(num + 1).toString()}
                    onChange={(e) => {
                      setImportMnemonic((prevValue) => {
                        const newValue = [...prevValue];
                        newValue[num] = e.target.value;
                        return newValue;
                      });
                    }}
                  ></input>
                );
              })}
            </div>
            <button
              className="w-[95%] h-12 my-2 rounded-lg bg-[#333] transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                if (!validateMnemonic(importMnemonic.join(" ").toString())) {
                  // console.log(importMnemonic)
                  alert("invalid mnemonic");
                  return;
                }
                const newSeed = mnemonicToSeedSync(
                  importMnemonic.join(" ").toString()
                );
                setSeed(newSeed);
                setIsWalletGenerated(true);

                localStorage.setItem(
                  "mnemonic",
                  importMnemonic.join(" ").toString()
                );
                setMnemonic(importMnemonic.join(" ").toString());
                setIsImportingMnemonic(false);
              }}
            >
              Import a Wallet
            </button>
          </div>
        </div>
      ) : null}
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Spinner />
        </div>
      ) : isWalletGenerated ? (
        <div>
          <div className="flex justify-center mt-20">
            <div
              className="text-white h-24 border border-gray-800 hover:bg-gray-800 hover:text-gray-200 text-4xl md:w-2/3 w-[96%] text-center flex items-center justify-center rounded-lg hover:cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                setIsMnemonicModalOpen(true);
              }}
            >
              Click here to see the mnemonic
            </div>
          </div>

          <WalletGenerator
            isSolana={isSolana}
            seed={seed}
            setSeed={setSeed}
            setIsSolana={setIsSolana}
          />

          {isMnemonicModalOpen ? (
            <MnemonicModal
              setIsMnemonicModalOpen={setIsMnemonicModalOpen}
              mnemonic={mnemonic.split(" ")}
            />
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 pl-2">
          <div className="flex md:w-[67%] w-[100%] mt-20  ml-2 md:ml-0 ">
            <div className="text-white text-5xl font-extrabold">
              Secret Recovery Phrase
            </div>
          </div>
          <div className="flex md:w-[67%] w-[100%] ml-2 md:ml-0 ">
            <div className="text-gray-400 text-xl font-semibold pr-2 mt-2">
              Warning: Copy and securely store your mnemonic phrase. If you lose
              it, you won’t be able to recover your wallet or access your funds!
            </div>
          </div>
          <div className="flex md:w-[67%] w-[100%] md:ml-0 mt-3 ">
            <button
              title="import a wallet"
              className="bg-white h-12 w-20  rounded-md text-lg font-semibold  hover:bg-gray-800 hover:text-gray-200 transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                setIsImportingMnemonic(true);
              }}
            >
              Import
            </button>
            <button
              title="generate a wallet"
              className="bg-white h-12 w-40  rounded-md text-lg ml-2 md:ml-6 font-semibold hover:bg-gray-800 hover:text-gray-200 transform transition-transform duration-300 hover:scale-105"
              onClick={generateWallet}
            >
              Generate a wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
