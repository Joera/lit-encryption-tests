import { Account } from "viem/accounts";
import { createAuthManager, storagePlugins, ViemAccountAuthenticator } from "@lit-protocol/auth"

export const createAuthContext = async (client: any, account: Account)  => {

        if (account == undefined) throw 'lit client not ready';
        
        const authData = await ViemAccountAuthenticator.authenticate(account);
    
        const authManager = createAuthManager({
            storage: storagePlugins.localStorageNode({
                appName: "s3ntiment",
                networkName: "naga-test",
                storagePath: "./lit_auth"
            }),
        });

        const authContext = await authManager.createEoaAuthContext({
            config: {
                account: account,
            },
            authConfig: {
                domain: "localhost",
                statement: "Decrypt test data",
                expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                resources: [
                ["access-control-condition-decryption", "*"],
                ["lit-action-execution", "*"],
                ],
            },
            litClient: client
        });

        return authContext
    }