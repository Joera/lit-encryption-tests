import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { accessControlConditionsAlwaysTrue } from "./acc_always_true.js";

export const actionWithUnifiedAccessControlConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    // Use the always true conditions that are known to work
    const cc = accessControlConditionsAlwaysTrue();

    // Encrypt with accessControlConditions
    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
          accessControlConditions: cc,
          dataToEncrypt: content,
        },
        client,
    );
    
    // Use the same conditions for decryption
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
