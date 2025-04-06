
import { createSessionSignatures } from "./session.js";
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { evmContractConditions } from "./evmcc.js";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";

export const actionWithEvmContractConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    const cc = evmContractConditions(safeAddress, publicationAddress);

    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
            evmContractConditions: cc,
            dataToEncrypt: content,
        },
        client,
    );
  
  const code = `(async () => {
    const resp = await Lit.Actions.decryptAndCombine({
      evmContractConditions : cc,
     // accessControlConditions: cc,
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
          cc,
          ciphertext,
          dataToEncryptHash
      }
  });
  
  console.log("decrypted content sent from lit action:", res);

}
