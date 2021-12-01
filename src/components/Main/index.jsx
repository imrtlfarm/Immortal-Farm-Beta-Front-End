import { Grid, Link, Typography } from "@mui/material";
import { Box, } from "@mui/system";
import { useState } from "react";
import EyeBackground from "../EyeComponent";
import ShadowPaper from "../Paper";
import About from "../About";
import Spread from "../Spread"
import Social from "../Social"
import TotalTVL from "../TotalTVL";
export default function Main () {
    const [currentTab, setCurrentTab] = useState(0);
    return (
        <main>
            <Box sx={{ px: { md: 10, xs: 3 }, pb: 4 }}>
                <Grid container spacing={8}>
                    <Grid item xl={4} lg={4} xs={12}>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(0) }} active={currentTab === 0}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>About</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(1) }} active={currentTab === 1} eyeprops={{ sx: { transform: 'rotate(0deg)' } }} >
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>FantomFocus Vault</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(2) }} active={currentTab === 2} eyeprops={{ sx: { transform: 'rotate(0deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Stables Vault</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(3) }} active={currentTab === 3} eyeprops={{ sx: { transform: 'rotate(0deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Duality Vault</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(4) }} active={currentTab === 4} eyeprops={{ sx: { transform: 'rotate(0deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Everything Vault</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-start" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(5) }} active={currentTab === 5} eyeprops={{ sx: { transform: 'rotate(0deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Documentation</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Social />
                    </Grid>
                    <Grid item xl={1} lg={0} sx={{ display: { xs: 'none', xl: 'block' } }}>
                    </Grid>
                    <Grid item xl={7} lg={8} xs={12}>
                        <Grid container spacing={8} sx={{ height: '100%' }} justifyContent='center'>

                            <Grid item xl={6} lg={6} md={6} xs={12}>
                                <ShadowPaper sx={{ height: '100%' }}>
                                    <TabPanel value={currentTab} index={0} >
                                        Welcome to Immortal Farm, the platform with the first fully-automated structured investment funds on the Fantom Opera Network! <br />
                                        What does it do? <br />
                                        No-Stress Investment <br />
                                        Want to invest in the FTM ecosystem but don't know where to start? <br />
                                        Want to invest in a dex but don't know which farm to choose? <br />
                                        Allow our MultiVaults to do the magic for you. <br />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={1} >
                                        A vault that focuses on tokens from some of the most successful projects on Fantom, paired with FTM in SpiritSwap Farms <br />
                                        TAROT-FTM LP <br />
                                        SUSHI-FTM LP <br />
                                        ICE-FTM LP <br />
                                        TOMB-FTM LP <br />
                                        GRIM-FTM LP <br />
                                        Deposit the LPs into SpiritSwap farms. <br />
                                        Autocompounds every hour, selling spirit interest back into the above investment schema.
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={2} >
                                        Invests in various forms of stablecoin-FTM pairs <br />
                                        FUSDT-FTM LP <br />
                                        USDC-FTM LP <br />
                                        MIM-FTM LP <br />
                                        TOMB-FTM LP <br />
                                        Deposit the LPs into SpiritSwap farms. <br />
                                        Autocompounds every hour, selling spirit interest back into the above investment schema.
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={3} >
                                        Invests in tokens that originate from chains other than FTM, paired with FTM, so that your holdings are further diversified. <br />
                                        CRV-FTM LP <br />
                                        LINK-FTM LP <br />
                                        YFI-FTM LP <br />
                                        ANY-FTM LP <br />
                                        Deposit the LPs into SpiritSwap farms. <br />
                                        Autocompounds every hour, selling spirit interest back into the above investment schema.
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={4} >
                                        Touch of Everything MultiVault <br />
                                        A vault that exposes you to every LP token in the previous 3 MultiVaults, evenly. <br />
                                        At the time of investment, split user investment evenly into: <br />
                                        fUSDT-FTM <br />
                                        USDC-FTM <br />
                                        MIM-FTM <br />
                                        TOMB-FTM <br />
                                        TAROT-FTM <br />
                                        SUSHI-FTM <br />
                                        ICE-FTM <br />
                                        GRIM-FTM <br />
                                        CRV-FTM <br />
                                        LINK-FTM <br />
                                        YFI-FTM <br />
                                        ANY-FTM <br />
                                        Deposit the LPs into SpiritSwap farms. <br />
                                        Autocompounds every hour, selling spirit interest back into the above investment schema.
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={5} >
                                        What does it do? <br />
                                        No-Stress Investment <br />
                                        Want to invest in the FTM ecosystem but don't know where to start? <br />
                                        Want to invest in a dex but don't know which farm to choose? <br />
                                        Allow our immortals to do the magic for you. <br />
                                    </TabPanel>
                                </ShadowPaper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                                <ShadowPaper sx={{ height: '100%' }}>
                                    <TabPanel value={currentTab} index={0} >
                                        <About />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={1} >
                                        <Spread type={'A'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={2} >
                                        <Spread type={'B'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={3} >
                                        <Spread type={'C'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={4} >
                                        <Spread type={'D'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={5} >
                                        <Link color="secondary.main" href="https://docs.immortal.farm" target="_blank">Visit Gitbook</Link>
                                    </TabPanel>
                                </ShadowPaper>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <TotalTVL />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </main >
    )
}


function TabPanel (props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}