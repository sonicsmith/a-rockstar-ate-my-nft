export const MAIN_CONTRACT_ADDRESS: `0x${string}` =
  "0xa6c6d1464fed5c336090cb45b4a01f60faf73332";

export const SUPERGROUPS_CONTRACT_ADDRESS: `0x${string}` = "0x0";

export const MAIN_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "args",
        type: "string[]",
      },
    ],
    name: "createSupergroup",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
