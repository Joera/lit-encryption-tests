export const runAction = async (
  client: any, 
  authContext: any, 
  encryptedData: any, 
  accs: any
) => {

  const code = `(async () => {

    const { accs, ciphertext, dataToEncryptHash } = jsParams;
    
    const decryptionParams = {
      accessControlConditions: accs,
      ciphertext: ciphertext,
      dataToEncryptHash: dataToEncryptHash,
      authSig: null,
      chain: "base",
    };

    console.log("Auth context user:", Lit.Auth);

    const decrypted = await Lit.Actions.decryptAndCombine(decryptionParams);

    Lit.Actions.setResponse({ 
      response: JSON.stringify({ decrypted }) 
    });
  })();`;


  // console.log(authContext);
  
  const res = await client.executeJs({
    code: code, 
    authContext,
    jsParams: {
      accs: accs,
      ciphertext: encryptedData.ciphertext,
      dataToEncryptHash: encryptedData.dataToEncryptHash
    }
  });
  
  console.log("result from lit action:", res);
  
  return res;
}