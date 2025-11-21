import { LIT_NETWORK, LIT_RPC } from "@lit-protocol/constants";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ethers as ethers5 } from "ethers5"; 
import { createSession } from "./session.js";
import { runAction } from "./action.js";
import { LitContracts } from "@lit-protocol/contracts-sdk";

const PK1 ="4101e21db7d3d8c7";
const PK2 ="11a159ff73a7db03243";
const PK3 ="5a74cb7ecca07f0d";
const PK4 ="04756c4194df3";



const SELECTED_LIT_NETWORK = LIT_NETWORK.Datil;

const client = new LitNodeClient({
    litNetwork: SELECTED_LIT_NETWORK,
    debug: false 
});

const litProvider = new ethers5.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
const signer = new ethers5.Wallet(PK1 + PK2 + PK3 + PK4, litProvider);
await client.connect();

const litContracts = new LitContracts({
      signer,
      network: SELECTED_LIT_NETWORK,
    });


await litContracts.connect();

const capacityTokenId = (
    await litContracts.mintCapacityCreditsNFT({
    requestsPerDay: 9999,
    daysUntilUTCMidnightExpiration: 7,
    })
).capacityTokenIdStr;

console.log("Capacity token ID:", capacityTokenId);

// const capacityTokenId = '337126'



const sessionSigs = await createSession(capacityTokenId, client, signer, 0);


await runAction(client, sessionSigs);
