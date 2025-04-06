import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { accessControlConditionsCustomContract } from "./acc_custom.js";

export const nodeWithAccessControlConditionsCustomContract = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string) => {
    
    const cc = accessControlConditionsCustomContract(safeAddress);  

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