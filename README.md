Hi, I have a strong suspicion that evm contract conditions and/or unified contract conditions are not implemented for lit actions, the decryptAndCombine function specifically.

I have created several functions that :

on node:
* succesfully encrypt and decrypt with accessControlConditions
* succesfully encrypt and decrypt with evmContractConditions
* succesfully encrypt and decrypt with unifiedAccessControlConditions

within action:
* succesfully encrypt and decrypt with accessControlConditions
* fail with evmContractConditions
* fail with unifiedAccessControlConditions

I have also tried several other variations related to the naming of keys, but all no dice. 

In main.ts you can uncomment various functions to see what I am trying to achieve, and what works or doesn't work.

npm i and then npm run start



