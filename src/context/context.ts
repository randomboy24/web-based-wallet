import { createContext } from "react";

export const MnemonicSeedContext = createContext({
    mnemonic:"",
    seed:Buffer.alloc(0)
})