
import { encryptString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { accessControlConditionsCustomContract } from "./acc_custom.js";

export const actionWithACCCustomContract = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string) => {

    const cc = accessControlConditionsCustomContract(safeAddress);

    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
            accessControlConditions: cc, // evmContractConditions,
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
      sessionSigs: sessionSigs, // your session
      jsParams: {
          cc,
          ciphertext,
          dataToEncryptHash
      }
  });
  
  console.log("decrypted content sent from lit action:", res);

}
