export const safeAbi = [
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "isOwner",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const publicationAbi = [
    {
        inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address"
        }
      ],
      name: "canPublish",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
];