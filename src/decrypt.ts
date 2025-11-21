declare global {
    const Lit: any;
}

export const decrypt = async (
  item: any,
  publicationModule: string,
  authorSafeAddress: string,
): Promise<any | undefined> => {

    const safeAbi = [
        {
            inputs: [
            {
                name: "owner",
                type: "address",
            },
            ],
            name: "isOwner",
            outputs: [
            {
                name: "",
                type: "bool",
            },
            ],
            stateMutability: "view",
            type: "function",
        }
    ];

    const publicationAbiStripped = [
        {
            inputs: [
            {
                name: "_author",
                type: "address",
            },
            ],
            name: "canPublish",
            outputs: [
            {
                name: "",
                type: "bool",
            },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
            {
                name: "stream_id",
                type: "string",
            },
            ],
            name: "hasDeal",
            outputs: [
            {
                name: "",
                type: "bool",
            },
            ],
            stateMutability: "view",
            type: "function",
        },
    ];


    const canRead = (stream_id: string, authorSafeAddress: string, publicationModule: string) => [
    {
        conditionType: "evmContract",
        contractAddress: publicationModule,
        functionName: "canPublish",
        functionParams: [authorSafeAddress],
        functionAbi: publicationAbiStripped[0],
        chain: "base",
        returnValueTest: {
          key: "",
          comparator: "=",  
          value: "true",
        }
    },
    {operator: "and"},
    {
        conditionType: "evmContract",
        contractAddress: authorSafeAddress,
        functionName: "isOwner",
        functionParams: [":userAddress"],
        functionAbi: safeAbi[0],
        chain: "base",
        returnValueTest: {
            key: "",
            comparator: "=",
            value: "true",
        }
    },
    {operator: "and"},
    {
        conditionType: "evmContract",
        contractAddress: publicationModule,
        functionName: "hasDeal",
        functionParams: [stream_id], 
        functionAbi: publicationAbiStripped[1],
        chain: "base",
        returnValueTest: {
            key: "",
            comparator: "=",
            value: "true",
        }
    }
]

    const ucc = canRead(item.id, authorSafeAddress, publicationModule);

    const content = JSON.parse(item.content)

    const decryptionParams = {
      accessControlConditions: ucc,
      ciphertext: content.ciphertext,
      dataToEncryptHash: content.dataToEncryptHash,
      authSig: null,
      chain: "base",
    };

    return await Lit.Actions.decryptAndCombine(decryptionParams);
};