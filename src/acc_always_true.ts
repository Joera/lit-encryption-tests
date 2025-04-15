export const accessControlConditionsAlwaysTrue = () => [
    {
    contractAddress: '',
    standardContractType: '',
    chain: "baseSepolia",
    method: '',
    parameters: [':userAddress'],
    returnValueTest: {
        comparator: '=',
        value: ':userAddress',
        },
    }
];
