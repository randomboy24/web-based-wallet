import {  X } from "lucide-react"


interface propTypes {
    setIsMnemonicModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
    mnemonic:string[]
}

export const MnemonicModal = ({setIsMnemonicModalOpen,mnemonic}:propTypes) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(mnemonic.toString()).then(() => {
            alert("secret phase copied to clipboard")
        }).catch(() => {
            alert("Failed to copy.")
        });
    }
    // console.log(mnemonic)
    return (
        <div className="fixed inset-0 backdrop-blur-sm text-white ">
            <div className="text-white flex  h-screen justify-center items-center">
                <div className="flex flex-col border border-gray-800 rounded-lg px-6 bg-gray-800 md:w-[420px] w-[300px]">
                    <div className="w-[109%] md:w-[106%]">
                        <X className="float-right hover:cursor-pointer" onClick={() => {
                            setIsMnemonicModalOpen(false)
                        }}></X > 
                    </div>
                    <div className="text-red-700 max-w-96 mt-3">
                        Do <u>not</u> share your secret phase if someone has your secret phrase they will have full control of your wallet. 
                    </div>
                    <div className="grid grid-rows-3 grid-cols-3 mt-2">
                        {mnemonic.map((word,index) => <div key={index}className=" border md:mx-2 md:my-2 my-1 mx-1 text-left bg-gray-900 rounded-md md:w-24 md:h-10 w-20 h-8  flex justify-center items-center">{word}      
                    </div>
 )}
                    </div>
                    <div className="max-w-96">
                        Click on the copy button below to copy the scret phase.
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-white text-black w-24 rounded-lg  text-xl font-semibold h-7 mb-5 mt-3 hover:bg-gray-600 hover:text-gray-200" onClick={handleCopy}>
                            Copy
                        </button>
                    </div>
                    <span className="relative text-white bottom-[379px] left-[379px] hover:cursor-pointer" onClick={() => {setIsMnemonicModalOpen(false)}}>   
                    </span>                
                </div>
            </div>
        </div>
    )
}