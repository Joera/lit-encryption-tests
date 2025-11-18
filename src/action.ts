import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ILitNodeClient, SessionSigs } from "@lit-protocol/types";
import { fetchByQuery } from './lens.factory.js';
import { decryptAndMerge } from './decrypt.js'

export const runAction = async (client: LitNodeClient | ILitNodeClient, sessionSigs: SessionSigs) => {


  const publicationModule = "0xe0b8658be3b91879A187752EbEec620e3eEF4140"
  const authorSafeAddress = "0x04660132323Fe65C5BaF9107Cfe8a941386b4EAF"
  
  // The code must be a STRING, not executed JavaScript
  const code = `(async () => {
    const fetchByQuery = ${fetchByQuery.toString()};
    const decryptAndMerge = ${decryptAndMerge.toString()};

    let results = await fetchByQuery({ 
      "feedAddress": "0x5a5Cc3f032A5c4dE76aE07b8ED188376f109f638"
    });

    console.log(results)

    results = results.filter( r => r.attributes.postType == 'post');

    results = results.slice(0,1)

    console.log("count", results.length)

    results = await Promise.all(
        results.map(async (item) => {
            return await decryptAndMerge(item, "${publicationModule}", "${authorSafeAddress}");
        })
      );
  
    console.log(results);

    Lit.Actions.setResponse({ response: JSON.stringify(results) });
  })();`;
  
  const res = await client.executeJs({
      code: code, // Pass the string directly, not JSON.stringify
      sessionSigs: sessionSigs,
      jsParams: {}
  });
  
  console.log("result from lit action:", res);

}