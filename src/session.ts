import { LitPKPResource, LitActionResource, createSiweMessageWithRecaps, generateAuthSig, LitAccessControlConditionResource } from "@lit-protocol/auth-helpers";
import { LIT_ABILITY } from "@lit-protocol/constants";
import fs from "fs";
import path from "path";

export const createSession = async (capacityTokenId: string, litNodeClient: any, ethersWallet:  any, index:  number) => {
  
    const { capacityDelegationAuthSig } =
        await litNodeClient.createCapacityDelegationAuthSig({
          dAppOwnerWallet: ethersWallet,
          capacityTokenId,
          delegateeAddresses: [ethersWallet.address],
          uses: "100",
        });

    const sessionSignatures = await litNodeClient.getSessionSigs({
        chain: "yellowstone",
        capabilityAuthSigs: [capacityDelegationAuthSig],
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resourceAbilityRequests: [
            {
            resource: new LitPKPResource("*"),
            ability: LIT_ABILITY.PKPSigning,
            },
            {
            resource: new LitActionResource("*"),
            ability: LIT_ABILITY.LitActionExecution,
            },
            {
            resource: new LitAccessControlConditionResource("*"),
            ability: LIT_ABILITY.AccessControlConditionDecryption,
            },
        ],
        authNeededCallback: async ({
            resourceAbilityRequests,
            expiration,
            uri,
        }: {
            resourceAbilityRequests?: any[];
            expiration?: string;
            uri?: string;
        }) => {
            const toSign = await createSiweMessageWithRecaps({
            uri: uri!,
            expiration: expiration!,
            resources: resourceAbilityRequests!,
            walletAddress: ethersWallet.address,
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient,
            });

            return await generateAuthSig({
            signer: ethersWallet,
            toSign,
            });
        },
        });

    return sessionSignatures;

    // fs.writeFileSync(
    //     path.join('sessions', `${index}.json`),
    //     JSON.stringify(sessionSignatures, null, 2)
    // );
}
  