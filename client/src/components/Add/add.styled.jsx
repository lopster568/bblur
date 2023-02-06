import { styled } from '@mui/material/styles'
import { Modal, Box } from "@mui/material";

export const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})
export const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
}))
