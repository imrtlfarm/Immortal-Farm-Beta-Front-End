export const poolsConfig = [
  {
    name: 'TAROT-FTM',
    id: '0xF050133847bb537C7476D054B8bE6e30253Fbd05',
    pid: 40,
  },
  {
    name: 'SUSHI-FTM',
    id: '0x9Fe4c0CE5F533e96C2b72d852f190961AD5a7bB3',
    pid: 8,
  },
  {
    name: 'ICE-FTM',
    id: '0x936D23C83c2469f6a14B9f5bEaec13879598A5aC',
    pid: 7,
  },
  {
    name: 'GRIM-FTM',
    id: '0x2c18c39622b90318B0124eCFd6d4aC81efcC51db',
    pid: 54,
  },
  {
    name: 'FUSDT-FTM',
    id: '0xd14Dd3c56D9bc306322d4cEa0E1C49e9dDf045D4',
    pid: 17,
  },
  {
    name: 'MIM-FTM',
    id: '0xB32b31DfAfbD53E310390F641C7119b5B9Ea0488',
    pid: 30,
  },
  {
    name: 'USDC-FTM',
    id: '0xe7E90f5a767406efF87Fdad7EB07ef407922EC1D',
    pid: 4,
  },
  {
    name: 'YFI-FTM',
    id: '0x4fc38a2735C7da1d71ccAbf6DeC235a7DA4Ec52C',
    pid: 13,
  },
  {
    name: 'CRV-FTM',
    id: '0x374C8ACb146407Ef0AE8F82BaAFcF8f4EC1708CF',
    pid: 10,
  },
  {
    name: 'LINK-FTM',
    id: '0xd061c6586670792331E14a80f3b3Bb267189C681',
    pid: 11,
  },
  {
    name: 'ANY-FTM',
    id: '0x26D583028989378Cc1b7CBC023f4Ae049d5e5899',
    pid: 18,
  },
];

export const vaultsConfig = [
  {
    id: 'A',
    title: 'FantomFocus Vault',
    text: 'A vault that focuses on tokens from some of the most successful projects on Fantom, paired with FTM in SpiritSwap Farms',
    pools: ['TAROT-FTM', 'SUSHI-FTM', 'ICE-FTM', 'GRIM-FTM'],
  },
  {
    id: 'B',
    title: 'Stables Vault',
    text: 'Invests in various forms of stablecoin-FTM pairs',
    pools: ['FUSDT-FTM', 'USDC-FTM', 'MIM-FTM'],
  },
  {
    id: 'C',
    title: 'Duality Vault',
    text: 'Invests in tokens that originate from chains other than FTM, paired with FTM, so that your holdings are further diversified.',
    pools: ['CRV-FTM', 'LINK-FTM', 'YFI-FTM', 'ANY-FTM'],
  },
  {
    id: 'D',
    title: 'Everything Vault',
    text: 'Touch of Everything MultiVault. A vault that exposes you to every LP token in the previous 3 MultiVaults, evenly. At the time of investment, split user investment evenly into:',
    pools: [
      'FUSDT-FTM',
      'USDC-FTM',
      'MIM-FTM',
      'TAROT-FTM',
      'SUSHI-FTM',
      'ICE-FTM',
      'GRIM-FTM',
      'CRV-FTM',
      'LINK-FTM',
      'YFI-FTM',
      'ANY-FTM',
    ],
  },
];
