import { LIT_NETWORK, LIT_RPC } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ethers as ethers5 } from "ethers5"; 
import { createSessionSignatures } from "./session.js";
import { runAction } from "./action.js";

const PK1 ="0xa7118b404bd1";
const PK2 = "e62e4e4fba08f38e1";
const PK3 ="fc8a1e7f9a4a94ff94e6";
const PK4 ="f83e6783f250fb1";
const AK1 ="DAfzjixY82ICdLCssh";
const AK2 = "_dTQpoN0I2mthW"; 
// dotenv.config();

const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.DatilDev,
    debug: true 
});

const litProvider = new ethers5.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
const baseSepoliaProvider = new ethers5.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${AK1}${AK2}`)
const signer = new ethers5.Wallet(PK1 + PK2 + PK3 + PK4, litProvider);
await client.connect();


const safeAddress = "0x47e03A42C07a09faB017b2a1011284d28C88121D";

const sessionSigs = await createSessionSignatures(client, signer);


await runAction(client, sessionSigs);
