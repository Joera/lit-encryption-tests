import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { unifiedContractConditions } from "./ucc.js";

export const nodeWithUnifiedAccessControlConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {
    
    const ucc = unifiedContractConditions(safeAddress, publicationAddress);  

    const { ciphertext, dataToEncryptHash } = await encryptString(
    {
          unifiedAccessControlConditions: ucc,
          dataToEncrypt: content,
        },
        client,
    );

    console.log("ciphertext", ciphertext);
    console.log("dataToEncryptHash", dataToEncryptHash);

    const decryptedString = await decryptToString(
      {
        unifiedAccessControlConditions: ucc, 
        chain: "baseSepolia",
        ciphertext,
        dataToEncryptHash,
        sessionSigs
      },
      client,
    );

    console.log("decryptedString", decryptedString);


}