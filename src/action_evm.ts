import { createSessionSignatures } from "./session.js";
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { evmContractConditions } from "./evmcc.js";

export const actionWithEvmContractConditions = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs, content: string, safeAddress: string, publicationAddress: string) => {

    // Get the EVM contract conditions
    const ecc = evmContractConditions(safeAddress, publicationAddress);

    // Encrypt with evmContractConditions
    const { ciphertext, dataToEncryptHash } = await encryptString(
        {
          evmContractConditions: ecc,
          dataToEncrypt: content,
        },
        client,
    );
    
    // Create access control conditions that match the format expected by Lit Actions
    // This is a simplified version that works for this specific use case
    const accessControlConditions = [
        {
            contractAddress: publicationAddress,
            standardContractType: '',
            chain: 'baseSepolia',
            method: 'canPublish',
            parameters: [safeAddress],
            returnValueTest: {
                comparator: '=',
                value: 'true'
            }
        },
        { operator: 'and' },
        {
            contractAddress: safeAddress,
            standardContractType: '',
            chain: 'baseSepolia',
            method: 'isOwner',
            parameters: [':userAddress'],
            returnValueTest: {
                comparator: '=',
                value: 'true'
            }
        }
    ];
  
    const code = `(async () => {
        const resp = await Lit.Actions.decryptAndCombine({
            accessControlConditions,
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
            accessControlConditions,
            ciphertext,
            dataToEncryptHash
        }
    });
  
    console.log("decrypted content sent from lit action:", res);
}
