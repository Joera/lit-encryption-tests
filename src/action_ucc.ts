import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { unifiedContractConditions } from "./ucc.js";
import { accessControlConditionsAlwaysTrue } from "./acc_always_true.js";

export const actionWithUnifiedAccessControlConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    // Using accessControlConditions for both encryption and decryption
    const cc = accessControlConditionsAlwaysTrue();

    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
          accessControlConditions: cc,
          dataToEncrypt: content,
        },
        client,
    );
    
  
  const code = `(async () => {
    const resp = await Lit.Actions.decryptAndCombine({
      accessControlConditions: cc,
      ciphertext,
      dataToEncryptHash,
      authSig: null,
      chain: 'baseSepolia',
    });
  
    Lit.Actions.setResponse({ response: resp });
  })();`
  
  const res = await client.executeJs({
      code,
      sessionSigs: sessionSigs,
      jsParams: {
          cc,
          ciphertext,
          dataToEncryptHash
      }
  });
  
  console.log("decrypted content sent from lit action:", res);

}
