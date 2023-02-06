import { styled } from '@mui/material/styles'
import { Box, Toolbar } from '@mui/material'

export const StyledToolbar = styled(Toolbar)({
    display: "flex"
})

export const Search = styled("div")(({ theme }) => ({
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: "40%"
}))
export const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}))

export const UserBox = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
        display: "flex"
    }
}))