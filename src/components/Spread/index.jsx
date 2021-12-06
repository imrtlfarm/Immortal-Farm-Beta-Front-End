import { parseUnits } from "@ethersproject/units";
import { Button, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { ApprovalState, useApproveCallback } from "../../hooks/useApproveCallback";
import { useSharePriceAContract, useSharePriceBContract, useSharePriceCContract, useSharePriceDContract, useSpreadAConract, useSpreadBConract, useSpreadCConract, useSpreadDConract } from "../../hooks/useContract";
import useSpreadBalance from "../../hooks/useSpreadBalacne";
import useSpreadBalance2 from "../../hooks/useSpreadBalacneTOK";
import { useTransactions } from "../../store/transactions";
import s from './Spread.module.scss';
const initialInputs = {
    depositAmount: "",
    withdrawAmount: '',
}
export default function Spread ({ type }) {
    const [inputValues, setInputValues] = useState(initialInputs);
    const [errors, setErrors] = useState({});
    const [depositing, setDepositing] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);
    const useContract = type === "A" ? useSpreadAConract : type === "B" ? useSpreadBConract : type === "C" ? useSpreadCConract : useSpreadDConract;
    const contract = useContract();
    const useSharePriceContract = type === "A" ? useSharePriceAContract : type === "B" ? useSharePriceBContract : type === "C" ? useSharePriceCContract : useSharePriceDContract;
    const sharePriceContract = useSharePriceContract()
    const spreadBalance = useSpreadBalance(contract, sharePriceContract);
    const spreadBalanceTOK = useSpreadBalance2(contract, sharePriceContract);
    const { account, library } = useWeb3React()
    const { AddTransaction } = useTransactions()
    const [approvalState, approveCallBack] = useApproveCallback(contract, 1, sharePriceContract?.address);
    const handleChange = (e) => {
        let nvalues = { ...inputValues };
        const name = e.target.name;
        const value = e.target.value
        if ((e.target.type === "number" && value >= 0) || e.target.type !== 'number') {
            nvalues[name] = value
        }


        setInputValues(nvalues)
    }

    const depositTokens = () => {
        const nerrors = { ...errors };
        if (!inputValues.depositAmount) {
            nerrors.depositAmount = "Amount is required";
        }
        else if (inputValues.depositAmount <= 0) {

            nerrors.depositAmount = "Enter a valid amount";
        }
        else {
            nerrors.depositAmount = null;
        }
        setErrors(nerrors);
        if (!nerrors.depositAmount && sharePriceContract) {
            setDepositing(true)
            const signer = library.getSigner(account)
            const params = {
                from: account,
                to: sharePriceContract.address,
                value: parseUnits(inputValues.depositAmount)
            };

            signer.sendTransaction(params).then(async (res) => {
                setInputValues({ ...inputValues, depositAmount: '' });
                setDepositing(false);
                AddTransaction(res.hash, `Deposited ${inputValues.depositAmount} FTM`);
            })
                .catch(error => {
                    setDepositing(false)
                    console.error(error)
                })
        }
    }
    const withdrawTokens = () => {
        const nerrors = { ...errors };
        if (!inputValues.withdrawAmount) {
            nerrors.withdrawAmount = "Amount is required";
        }
        else if (inputValues.withdrawAmount <= 0) {

            nerrors.withdrawAmount = "Enter a valid amount";
        }
        else {
            nerrors.withdrawAmount = null;
        }
        setErrors(nerrors);
        if (!nerrors.withdrawAmount && sharePriceContract) {
            setWithdrawing(true)
            sharePriceContract.withdraw(parseUnits(inputValues.withdrawAmount))
                .then(async (res) => {
                    setInputValues({ ...inputValues, withdrawAmount: '' });
                    setWithdrawing(false);
                    AddTransaction(res.hash, `Withdraw ${inputValues.withdrawAmount} FTM`);
                })
                .catch(error => {
                    setWithdrawing(false)
                    console.error(error)
                })
        }
    }
    return (
        <div className={s.root}>
            <div className={s.block}>
                <Typography color='common.white' fontWeight='bold' sx={{ textTransform: 'uppercase' }} >Deposit</Typography>
                <Box display="flex" alignItems='center' flexWrap={{ xs: "wrap", xl: 'nowrap' }}>
                    <Typography color='common.white' fontWeight='normal' fontSize="small" sx={{ whiteSpace: 'nowrap' }} >Deposit FTM:</Typography>
                    <Input  onChange={handleChange} name='depositAmount' value={inputValues.depositAmount} placeholder="Amount" type="number" sx={{ mx: 2 }} inputProps={{ min: 0, sx: { color: 'common.white', fontSize: 'small' } }} />
                    <Typography fontWeight='bold' fontSize="small" color="secondary.main" >FTM</Typography>
                </Box>
                {
                    errors.depositAmount &&
                    <Typography sx={{ fontSize: '.7rem' }} color="error">{errors.depositAmount}</Typography>
                }
                <Button variant="contained" sx={{ mt: 2 }} disabled={depositing} onClick={depositTokens}>
                    <Typography fontWeight="bold">
                        Deposit
                    </Typography>

                </Button>
            </div>

            <div className={s.block}>
                <Typography color='common.white' fontWeight='bold' sx={{ textTransform: 'uppercase' }} >Withdraw</Typography>
                <Box display="flex" alignItems='center' flexWrap={{ xs: "wrap" }}>
                    <Typography color='common.white' fontWeight='normal' fontSize="small" sx={{ whiteSpace: 'nowrap' }} >Withdraw SHARES: </Typography>

                    {<Input onChange={handleChange} name='withdrawAmount' value={inputValues.withdrawAmount} placeholder="Amount" type="number" sx={{ mx: 2 }} inputProps={{ min: 0, sx: { color: 'common.white', fontSize: 'small' } }} />}
                    {<Typography fontWeight='bold' fontSize="small" color="secondary.main" >SHARES</Typography>}

                </Box>
                {
                    errors.withdrawAmount &&
                    <Typography sx={{ fontSize: '.7rem' }} color="error">{errors.withdrawAmount}</Typography>
                }
                {
                    approvalState === ApprovalState.APPROVED ?

                        <Button variant="contained" sx={{ mt: 2 }} disabled={withdrawing} onClick={withdrawTokens}>
                            <Typography fontWeight="bold">
                                Withdraw
                            </Typography>

                        </Button> :
                        <Button variant="contained" sx={{ mt: 2 }} disabled={approvalState === ApprovalState.PENDING} onClick={approveCallBack}>
                            <Typography fontWeight="bold">
                                {
                                    approvalState === ApprovalState.PENDING ? "Approving..." : 'Approve'
                                }

                            </Typography>

                        </Button>
                }
            </div>

            <div className={s.balance}>
                <Typography color='common.white' fontWeight='bold' sx={{ textTransform: 'uppercase' }} >Bal</Typography>
                <Box display="flex" alignItems='center'>
                    <Typography color='common.white' fontWeight='normal' fontSize="small" sx={{ whiteSpace: 'nowrap' }} >Vault Balance: </Typography>

                    <Typography fontWeight="400" color="common.white">&nbsp; {typeof spreadBalanceTOK === 'number' ? spreadBalanceTOK : '..'} &nbsp; </Typography>

                    <Typography fontWeight='bold' fontSize="small" color="secondary.main" >SHARE TOKENS</Typography>
                </Box>
                <Box display="flex" alignItems='center'>
                    <Typography color='common.white' fontWeight='normal' fontSize="small" sx={{ whiteSpace: 'nowrap' }} >Vault Balance: </Typography>

                    <Typography fontWeight="400" color="common.white">&nbsp; {spreadBalance || '..'} &nbsp; </Typography>

                    <Typography fontWeight='bold' fontSize="small" color="secondary.main" >FTM</Typography>
                </Box>
            </div>

            <p className={s.text}>
                Deposit the LPs into SpiritSwap farms. Autocompounds every hour, selling
                spirit interest back into the above investment schema.
            </p>
        </div>
    )
}