export const safeAbi = [
  {
    inputs: [{name: "owner", type: "address"}],
    name: "isOwner",
    outputs: [{name: "", type: "bool"}],
    stateMutability: "view",
    type: "function"
  }
];

export const publicationAbi = [
    {
        inputs: [
        {
          name: "_author",
          type: "address"
        }
      ],
      name: "canPublish",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
];