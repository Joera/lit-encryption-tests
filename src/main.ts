import { LIT_RPC } from "@lit-protocol/constants";
import { createLitClient } from "@lit-protocol/lit-client";
import { nagaTest } from "@lit-protocol/networks";
import { privateKeyToAccount } from "viem/accounts";
import { runAction } from "./action.js";
import { createAuthContext } from "./session.js";
import { canRead } from "@s2s/soul2soul-shared";
import { accessControlConditionsAlwaysTrue, canReadSimple } from "./acc_always_true.js"
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const PK1 ="4101e21db7d3d8c7";
const PK2 ="11a159ff73a7db03243";
const PK3 ="5a74cb7ecca07f0d";
const PK4 ="04756c4194df3";

const client = await createLitClient({
    network: nagaTest,
});

const account = privateKeyToAccount(
    // '0x' + PK1 + PK2 + PK3 + PK4 as `0x${string}`
    '0x4101e21db7d3d8c711a159ff73a7db032435a74cb7ecca07f0d04756c4194df3' as `0x${string}`
);

const authContext = await createAuthContext(client,account);

const contentId = "40255038220314795022404003530460736335084480480965257555859155696237091809234";
const safeAddress = "0x04660132323Fe65C5BaF9107Cfe8a941386b4EAF";
const publicationModule = "0xb1409FA5af8e2448C9334B3BF9Bec6f08b3599cC";



const accs = canReadSimple(safeAddress); // canRead(contentId, safeAddress, publicationModule, )

const encryptedData = await client.encrypt({
  dataToEncrypt: "Hello, my love! ❤️",
  unifiedAccessControlConditions: accs,
  chain: "ethereum",
});

const decryptedResponse = await client.decrypt({
  data: encryptedData,
  unifiedAccessControlConditions: accs,
  authContext: authContext,
  chain: "ethereum",
});

console.log(decryptedResponse);


await runAction(client, authContext, encryptedData, accs);
