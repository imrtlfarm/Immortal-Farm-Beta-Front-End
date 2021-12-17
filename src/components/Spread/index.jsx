import { parseUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import cl from 'classnames';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useTransactions } from '../../store/transactions';
import { usePopups } from '../../store/popups';
import s from './Spread.module.scss';

export default function Spread({ data }) {
  const [depositing, setDepositing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [deposit, setDeposit] = useState('');
  const [withdraw, setWithdraw] = useState('');

  const { spreadContract, sharePriceContract, balance, unformattedBalance, TVL } = data;
  const { account, library } = useWeb3React();
  const { AddTransaction } = useTransactions();
  const [approvalState, approveCallBack] = useApproveCallback(spreadContract, 1, sharePriceContract?.address);
  const { AddPopup } = usePopups();

  const handleError = (error) => {
    let text = error?.data?.message;
    if (!text || text.includes('User denied transaction signature')) return;
    if (text.includes('Wait for cooldown after depositing before you can withdraw')) {
      text = text + '. Withdraw still on CD';
    }
    AddPopup({ type: 'error', text });
  };

  const getGasLimit = async (method, params) => {
    try {
      const estimatedGas = await sharePriceContract.estimateGas[method](...params);
      const gasLimit = estimatedGas.mul(110).div(100);
      return gasLimit;
    } catch (err) {
      console.log('gasLimitError', err);
      return undefined;
    }
  };

  const depositTokens = (ev) => {
    ev.preventDefault();
    if (Number(deposit) === 0) {
      AddPopup({ type: 'error', text: 'Amount cannot be equal to 0' });
      return;
    }
    if (!sharePriceContract) return;

    setDepositing(true);
    const signer = library.getSigner(account);
    const params = {
      from: account,
      to: sharePriceContract.address,
      value: parseUnits(deposit),
    };

    signer
      .sendTransaction(params)
      .then(async (res) => {
        setDeposit(undefined);
        AddTransaction(res.hash, `Deposited ${deposit} FTM`);
      })
      .catch(handleError)
      .finally(() => setDepositing(false));
  };

  const withdrawTokens = async (ev) => {
    ev.preventDefault();
    if (Number(withdraw) === 0) {
      AddPopup({ type: 'error', text: 'Amount cannot be equal to 0' });
      return;
    }
    if (!sharePriceContract) return;
    setWithdrawing(true);
    const gasLimit = await getGasLimit('withdraw', [parseUnits(withdraw)]);

    sharePriceContract
      .withdraw(parseUnits(withdraw), { gasLimit })
      .then(async (res) => {
        setWithdraw(undefined);
        AddTransaction(res.hash, `Withdraw ${withdraw} FTM`);
      })
      .catch(handleError)
      .finally(() => setWithdrawing(false));
  };

  const withdrawAll = async () => {
    if (!sharePriceContract) return;
    setWithdrawing(true);
    const gasLimit = await getGasLimit('withdraw', [unformattedBalance]);

    sharePriceContract
      .withdraw(unformattedBalance, { gasLimit })
      .then(async (res) => {
        AddTransaction(res.hash, `Withdraw ${withdraw} FTM`);
      })
      .catch(handleError)
      .finally(() => setWithdrawing(false));
  };

  return (
    <>
      <div className={s.root}>
        <p className={s.text}>
          Deposit the LPs into SpiritSwap farms. Autocompounds every hour, selling spirit interest back into the above
          investment schema.
        </p>
        <form className={s.form} onSubmit={depositTokens}>
          <div className={s.capture}>Deposit</div>
          <div className={s.formField}>
            <input
              className={s.input}
              value={deposit}
              onChange={(ev) => setDeposit(ev.target.value)}
              type="number"
              placeholder="Amount"
              required
              min={0}
              step="any"
            />
            <div className={s.unit}>FTM</div>
          </div>
          <button className={s.button} disabled={depositing} type="submit">
            Deposit
          </button>
        </form>
        <form className={s.form} onSubmit={withdrawTokens}>
          <div className={s.capture}>Withdraw</div>
          <div className={s.formField}>
            <input
              className={s.input}
              value={withdraw}
              onChange={(ev) => setWithdraw(ev.target.value)}
              type="number"
              placeholder="Amount"
              required
              min={0}
              step="any"
            />
            <div className={s.unit}>Shares</div>
          </div>
          <div className={s.buttons}>
            {approvalState === ApprovalState.APPROVED ? (
              <button className={s.button} disabled={withdrawing} type="submit">
                Approve
              </button>
            ) : (
              <button
                className={s.button}
                disabled={approvalState === ApprovalState.PENDING}
                onClick={approveCallBack}
                type="button"
              >
                {approvalState === ApprovalState.PENDING ? 'Approving...' : 'Approve'}
              </button>
            )}
            <button className={s.button} disabled={withdrawing} onClick={withdrawAll} type="button">
              Withdraw all
            </button>
          </div>
        </form>
        <div className={cl(s.balance)}>
          <div className={s.capture}>Vault TVL:</div>
          <div className={s.value}>{TVL || '..'}</div>
          <div className={s.unit}>FTM</div>
        </div>
        <div className={cl(s.balance)}>
          <div className={s.capture}>Vault balance:</div>
          <div className={s.value}>{typeof balance === 'number' ? balance : '..'}</div>
          <div className={s.unit}>Share tokens</div>
        </div>
      </div>
    </>
  );
}
