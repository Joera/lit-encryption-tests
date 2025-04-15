import { publicationAbi, safeAbi } from "./abi.js";

export const unifiedContractConditions = (safeAddress: string, publicationAddress: string) => [
    {
        conditionType: "evmContract",
        contractAddress: publicationAddress,
        // standardContractType: "",
        // method: "canPublish",
        // parameters: [ safeAddress ],
        functionName: "canPublish",
        functionParams: [ safeAddress ],
        functionAbi: publicationAbi[0],
        chain: "baseSepolia",
        returnValueTest: {
          key: "",
          comparator: "=",  
          value: "true"
        }
    },
    { operator: "and" },
    {
        conditionType: "evmContract",
        contractAddress: safeAddress,
        // standardContractType: "",
        // method: "isOwner",
        // parameters: [":userAddress"],
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
