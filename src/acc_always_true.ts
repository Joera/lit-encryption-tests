export const accessControlConditionsAlwaysTrue =  [
  {
    conditionType: "evmBasic" as const,
    contractAddress: "",
    standardContractType: "" as const,
    chain: "base" as const,
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=" as const,
      value: "0x8785e05B7Eb0Ff9B138d0882241A68F33Eff2915",
    },
  }
];


import { createAccBuilder } from "@lit-protocol/access-control-conditions";

export const canReadSimple = (safeAddress: string) => 
  createAccBuilder()
    .evmContract({
      contractAddress: safeAddress,
      functionName: "isOwner",
      functionParams: [":userAddress"],
      functionAbi: {
        name: "isOwner",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      returnValueTest: {
        key: "",
        comparator: "=",
        value: "true",
      },
    })
    .on("base")
    .build();