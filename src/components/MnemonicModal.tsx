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
    console.log(mnemonic)
    return (
        <div className="fixed inset-0 backdrop-blur-sm text-white ">
            <div className="text-white flex flex-col h-screen justify-center items-center">
                <div className="flex flex-col border border-gray-800 rounded-lg px-6 bg-gray-800">
                    <div className="text-red-700 max-w-96 mt-3">
                        Do <u>not</u> share your secret phase if someone has your secret phrase they will have full control of your wallet. 
                    </div>
                    <div className="grid grid-rows-3 grid-cols-3 ">
                        {mnemonic.map((word,index) => <div key={index}className="mx-2 my-2 text-left bg-gray-900 rounded-md h-8 pl-1 pt-1 ">{mnemonic.indexOf(word)+1}. {word}
                           
                        </div>
 )}
                    </div>
                    <div className="max-w-96">
                        Click on the copy button below to copy the scret phase.
                    </div>
                    <button className="bg-white text-black w-24 rounded-lg ml-32 text-xl font-semibold h-7 mb-5 mt-3 hover:bg-gray-600 hover:text-gray-200" onClick={handleCopy}>
                        Copy
                    </button>
                    <span className="relative text-white bottom-[379px] left-[379px] hover:cursor-pointer" onClick={() => {setIsMnemonicModalOpen(false)}}>
                        <X></X>    
                    </span>                
                </div>
            </div>
        </div>
    )
}