import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { truncate } from '../utils';
import { useBlockchainCall } from './useBlockchainCall';
import { useSpreadContract, useSharePriceContract } from './useContract';

// vaultId = 'A' | 'B' | 'C' | 'D'
export const useVault = (vaultId) => {
  const { account } = useWeb3React();
  const spreadContract = useSpreadContract(vaultId);
  const sharePriceContract = useSharePriceContract(vaultId);

  // balance is amount of items
  const balance = useBlockchainCall(spreadContract, 'balanceOf', [account]);
  const sharePrice = useBlockchainCall(
    sharePriceContract,
    'sharePriceFTM',
    [],
  );
  const totalBalance = useBlockchainCall(spreadContract, 'totalSupply', []);

  return useMemo(() => {
    return {
      spreadContract,
      sharePriceContract,
      balance: balance && truncate(formatEther(balance).toString()),
      TVL:
        balance &&
        sharePrice &&
        truncate((formatEther(balance) * formatEther(sharePrice)).toString()),
      totalTVL:
        totalBalance &&
        sharePrice &&
        truncate(
          (formatEther(totalBalance) * formatEther(sharePrice)).toString(),
        ),
    };
  }, [balance, sharePrice, sharePriceContract, spreadContract, totalBalance]);
};
