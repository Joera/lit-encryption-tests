import { publicationAbi, safeAbi } from "./abi.js";


export const evmContractConditions = (safeAddress: string, publicationAddress: string) => [
    {
        contractAddress: publicationAddress,
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
