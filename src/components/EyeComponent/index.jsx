import { Box, styled } from "@mui/system"



const StyledEye = styled(Box)(({ theme, color }) => ({
    margin: ' 10 auto',
    width: '400px',
    height: '60%',
    backgroundColor: color ? color : theme.palette.background.paper,
    borderRadius: '0% 0px',
    transform: 'rotate(0deg)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    padding: 2,
}))
const Wrapper = styled(Box)(({ theme, active }) => ({
    position: 'relative',
    padding: theme.spacing(5, 5),
    flexGrow: 0,
    cursor: 'pointer',
    opacity: active ? .7 : 1,
    "&:hover": {
        opacity: .85
    }
}))

export default function EyeBackground ({ children, eyeprops, active, ...props }) {
    return <Wrapper  {...props} active={active}>
        <StyledEye {...eyeprops} />
        {
            children
        }
    </Wrapper>
}