import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { evmContractConditions } from "./evmcc.js";

export const nodeWithEvmContractConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {
    
    const cc = evmContractConditions(safeAddress, publicationAddress);  

    const { ciphertext, dataToEncryptHash } = await encryptString(
    {
          evmContractConditions: cc,
          dataToEncrypt: content,
        },
        client,
    );

    console.log("ciphertext", ciphertext);
    console.log("dataToEncryptHash", dataToEncryptHash);

    const decryptedString = await decryptToString(
      {
        evmContractConditions: cc, 
        chain: "baseSepolia",
        ciphertext,
        dataToEncryptHash,
        sessionSigs
      },
      client,
    );

    console.log("decryptedString", decryptedString);


}