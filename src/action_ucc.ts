
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { unifiedContractConditions } from "./ucc.js";

export const actionWithUnifiedAccessControlConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    const ucc = unifiedContractConditions(safeAddress, publicationAddress);

    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
          unifiedAccessControlConditions: ucc,
          dataToEncrypt: content,
        },
        client,
    );
    
  
  const code = `(async () => {
    const resp = await Lit.Actions.decryptAndCombine({
      accessControlConditions: ucc,
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
          ucc,
          ciphertext,
          dataToEncryptHash
      }
  });
  
console.log("decrypted content sent from lit action:", res);

}
