import ABI from '../constants/abi.json';
import SHARE_PRICE_ABI from '../constants/sharePrice.json';
import APPROVAL_ABI from '../constants/approve.json';
import {
  APPROVAL_CONTRACT_ADDRESS,
  SPREAD_CONTRACT_ADDRESS,
  SHARE_PRICE_CONTRACT_ADDRESS,
} from '../constants/index';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { AddressZero } from '@ethersproject/constants';
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useApprovalContract() {
  return useContract(APPROVAL_CONTRACT_ADDRESS, APPROVAL_ABI);
}

// contractId = 'A' | 'B' | 'C' | 'D'
export const useSpreadContract = (contractId) => {
  return useContract(SPREAD_CONTRACT_ADDRESS[contractId], ABI);
};

export const useSharePriceContract = (contractId) => {
  return useContract(SHARE_PRICE_CONTRACT_ADDRESS[contractId], SHARE_PRICE_ABI);
};
