import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSpreadABalance, useSpreadBBalance, useSpreadCBalance, useSpreadDBalance } from "../../hooks/useSpreadBalacne";

export default function About () {
    const spreadABalance = useSpreadABalance()
    const spreadBBalance = useSpreadBBalance()
    const spreadCBalance = useSpreadCBalance()
    const spreadDBalance = useSpreadDBalance()
    return (
        <Box >
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Fantom Focus Vault Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadABalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Stables Vault Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadBBalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Duality Vault Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadCBalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Everything Vault Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadDBalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>

        </Box>
    )
}