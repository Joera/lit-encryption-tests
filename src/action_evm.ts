
import { createSessionSignatures } from "./session.js";
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { evmContractConditions } from "./evmcc.js";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { accessControlConditionsAlwaysTrue } from "./acc_always_true.js";
import { unifiedContractConditions } from "./ucc.js";

export const actionWithEvmContractConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    // const acc = accessControlConditionsAlwaysTrue();
    const ecc = evmContractConditions(safeAddress, publicationAddress);
    // const ucc = unifiedContractConditions(safeAddress, publicationAddress);

    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
          //unifiedAccessControlConditions: ecc,
          evmContractConditions: ecc,
          dataToEncrypt: content,
        },
        client,
    );
    
  
  const code = `(async () => {
    const resp = await Lit.Actions.decryptAndCombine({
      evmContractConditions: ecc,
      ciphertext,
      dataToEncryptHash,
      authSig: null,
      chain: 'baseSepolia',
    });
  
    Lit.Actions.setResponse({ response: resp });
  })();`
  
  const res = await client.executeJs({
      code,
      sessionSigs: sessionSigs, // your session
      jsParams: {
          ecc,
          ciphertext,
          dataToEncryptHash
      }
  });
  
  console.log("decrypted content sent from lit action:", res);

}
