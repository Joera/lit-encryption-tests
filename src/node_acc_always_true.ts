import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { accessControlConditionsAlwaysTrue } from "./acc_always_true.js";

export const nodeWithAccessControlConditionsAlwaysTrue = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string) => {
    
    const cc = accessControlConditionsAlwaysTrue();  

    const { ciphertext, dataToEncryptHash } = await encryptString(
    {
          accessControlConditions: cc,
          dataToEncrypt: content,
        },
        client,
    );

    console.log("ciphertext", ciphertext);
    console.log("dataToEncryptHash", dataToEncryptHash);

    const decryptedString = await decryptToString(
      {
        accessControlConditions: cc, 
        chain: "baseSepolia",
        ciphertext,
        dataToEncryptHash,
        sessionSigs
      },
      client,
    );

    console.log("decryptedString", decryptedString);


}