import { publicationAbi, safeAbi } from "./abi.js";

export const unifiedContractConditions = (safeAddress: string, publicationAddress: string) => [
    {
        conditionType: "evmContract",
        contractAddress: publicationAddress,
        functionName: "canPublish",
        functionParams: [safeAddress],
        functionAbi: publicationAbi[0],
        chain: "baseSepolia",
        returnValueTest: {
          key: "",
          comparator: "=",  
          value: "true"
        }
    },
    {operator: "and"},
    {
        conditionType: "evmContract",
        contractAddress: safeAddress,
        functionName: "isOwner",
        functionParams: [":userAddress"],
        functionAbi: safeAbi[0],
        chain: "baseSepolia",
        returnValueTest: {
            key: "",
            comparator: "=",
            value: "true"
        }
    },
];
