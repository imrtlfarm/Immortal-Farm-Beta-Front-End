import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { Contract } from '@ethersproject/contracts';
import { getWeightedAverage } from '../utils';
import { vaultsConfig, poolsConfig } from '../configs';
import { SHARE_PRICE_CONTRACT_ADDRESS, MASTER_CHEF_ADDRESS } from '../constants';
import POOL_ABI from '../constants/poolABI.json';
import { useMasterChefContract, useSpiritFTMPoolContract } from './useContract';

const UPDATE_INTERVAL = 2 * 60 * 1000;
const toBigNumber = (otherBigNumber) => BigNumber(otherBigNumber.toString());
const cachedPoolContracts = new Map();

export const useAPY = (vaultId) => {
  const { library, account } = useWeb3React();
  const masterChefContract = useMasterChefContract(vaultId);
  const spiritFTMPoolContract = useSpiritFTMPoolContract();
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [APY, setAPY] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => setShouldUpdate(true), UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  const getPoolContract = useCallback(
    (poolHash) => {
      let contract = cachedPoolContracts.get(poolHash);
      if (contract) return contract;
      contract = new Contract(poolHash, POOL_ABI, library.getSigner(account).connectUnchecked());
      cachedPoolContracts.set(poolHash, contract);
      return contract;
    },
    [account, library],
  );

  const getFee = useCallback(async (poolHash) => {
    let fee = 0;
    try {
      const covalent = await axios.get(
        `https://api.covalenthq.com/v1/250/xy=k/spiritswap/pools/address/${poolHash}/?key=ckey_4e30f83f47a14c799789e95153b`,
      );
      const { total_liquidity_quote, fee_24h_quote } = covalent.data.data.items[0];
      fee = (fee_24h_quote / total_liquidity_quote) * 365 * 100 * (5 / 6);
    } catch (err) {
      console.error(err);
    }
    return fee;
  }, []);

  const calculate = useCallback(async () => {
    if (!masterChefContract || !spiritFTMPoolContract) return;

    // START CALCULATION

    const totalAllocPoint = toBigNumber(await masterChefContract.totalAllocPoint());
    const spiritPerBlock = toBigNumber(await masterChefContract.spiritPerBlock());
    const pools = vaultsConfig.find((vault) => vault.id === vaultId).pools;

    // START CALCULATION FOR EACH POOL IN VAULT
    const poolsData = await Promise.all(
      pools.map(async (poolName) => {
        const poolId = poolsConfig.find((pool) => pool.name === poolName).pid;
        const poolHash = poolsConfig.find((pool) => pool.name === poolName).id;
        const poolContract = getPoolContract(poolHash);

        const poolInfo = await masterChefContract.poolInfo(poolId);
        const allocPoint = toBigNumber(poolInfo.allocPoint);
        const spiritPerBlockInPool = allocPoint.dividedBy(totalAllocPoint).multipliedBy(spiritPerBlock);

        const userInfo = await masterChefContract.userInfo(poolId, SHARE_PRICE_CONTRACT_ADDRESS[vaultId]);
        const totalAmountDepositedByUser = toBigNumber(userInfo.amount);
        const balanceOf = toBigNumber(await poolContract.balanceOf(MASTER_CHEF_ADDRESS));

        const spiritPerBlockInPoolByVault = totalAmountDepositedByUser
          .multipliedBy(spiritPerBlockInPool)
          .dividedBy(balanceOf);

        const [FTM, spirit] = await spiritFTMPoolContract.getReserves();
        const FTMSpiritRatio = toBigNumber(FTM).dividedBy(toBigNumber(spirit));
        const FTMPerBlockInPoolByVault = spiritPerBlockInPoolByVault.multipliedBy(FTMSpiritRatio);

        const poolToken0 = await poolContract.token0();
        const reserves = await poolContract.getReserves();
        const WFTM_ADDRESS = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'; // !differs from doc
        const reservesWFTM = toBigNumber(reserves[poolToken0 === WFTM_ADDRESS ? 0 : 1]);

        const farmTVLFTM = reservesWFTM.multipliedBy(2);

        const ownershipRatio = totalAmountDepositedByUser.dividedBy(balanceOf);
        const underlyingFTM = farmTVLFTM.multipliedBy(ownershipRatio);

        const percentageInterestRatePerBlock = FTMPerBlockInPoolByVault.dividedBy(underlyingFTM).multipliedBy(100);

        const SEC_IN_YEAR = 60 * 60 * 24 * 365; // 31 536 000
        const BLOCKS_PER_YEAR = SEC_IN_YEAR / 0.9;
        const APR = percentageInterestRatePerBlock.multipliedBy(BLOCKS_PER_YEAR);
        const fee = await getFee(poolHash);

        return { APR, weight: underlyingFTM, fee };
      }),
    );
    // FINISH CALCULATION FOR EACH POOL IN VAULT

    const APRs = poolsData.map((el) => el.APR.decimalPlaces(5).toNumber() + el.fee);
    const weights = poolsData.map((el) => el.weight.decimalPlaces(5).toNumber());
    const weightedAPR = getWeightedAverage(APRs, weights).toFixed(5);

    const N = 24 * 365; // 60 mins to compound
    const APY = (Math.pow(1 + weightedAPR / 100 / N, N) - 1) * 100;
    setAPY(APY.toFixed(2));

    // FINISH CALCULATION
  }, [getFee, getPoolContract, masterChefContract, spiritFTMPoolContract, vaultId]);

  useEffect(() => {
    if (account && shouldUpdate) {
      setShouldUpdate(false);
      calculate();
    }
    if (!account) {
      cachedPoolContracts.clear();
    }
  }, [shouldUpdate, account, calculate]);

  return APY;
};
