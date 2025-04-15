export const unifiedAccessControlConditionsCustomContract = (safeAddress: string) => [

    {
        contractAddress: safeAddress,
        standardContractType: '',
        chain: "baseSepolia",
        method: 'isOwner',
        parameters: [':userAddress'],
        returnValueTest: {
            comparator: '=',
            value: 'true',
        },
    }
];
