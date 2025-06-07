import React, { useState, useRef, Dispatch, SetStateAction } from "react";

interface propTypes {
  isMainnet: boolean;
  setIsMainnet: Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({ isMainnet, setIsMainnet }: propTypes) => {
  console.log(isMainnet);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(
    isMainnet ? "Mainnet" : "Devnet"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(document.activeElement)
      ) {
        setIsOpen(false);
      }
    }, 100);
  };

  const handleSelectNetwork = (network: string) => {
    setSelectedNetwork(network);
    setIsMainnet(network === "Mainnet");
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        {selectedNetwork}
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownMenu"
          className="absolute right-0 z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-48"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="py-1 text-sm text-gray-700 mt-0">
            <li>
              <span
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSelectNetwork("Mainnet");
                  setIsMainnet(true);
                }}
              >
                Mainnet
              </span>
            </li>
            <li>
              <span
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSelectNetwork("Devnet");
                  setIsMainnet(false);
                }}
              >
                Devnet
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
