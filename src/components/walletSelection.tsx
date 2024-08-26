

export const WalletSelection = ({setIsEthereum,setIsSolana}:any) => {
    return (
        <div className="flex justify-center">
            <div>
                <div className="text-white text-5xl font-bold mt-24 ml-8 md:ml-52 max-w-fit md:w-3/6">
                WebVault: The vault where your crypto and peace of mind coexist.
                </div>
                <div className="  text-2xl text-gray-300 ml-8 md:ml-52 mt-3">
                    Choose a blockchain to get started.
                </div>
                <div className="mt-5">
                    <button className="text-black bg-white ml-8 md:ml-52 h-12 w-36 hover:bg-gray-800 hover:text-gray-200 rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setIsSolana(true)
                        localStorage.setItem('isSolana','true')
                    }}>
                    Solana
                    </button>
                    <button className="text-black bg-white ml-2 h-12 w-40 hover:bg-gray-800 hover:text-gray-200  rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setIsEthereum(true)
                        
                    }}>
                    Ethereum
                    </button>
                </div>
            </div>
        </div>
    )
}