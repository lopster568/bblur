import { Stack, Box, TextField, Typography, Button, MenuItem, Menu } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { StyledAvatar } from "./profile.styled";
import FileBase from 'react-file-base64';
import { useState } from "react";
import { updateUser } from "../../api/user";
import { updateCurrentUser } from "../../redux/user/user.actions";

const Profile = () => {
    const dispatch = useDispatch()
    const { displayName, username, email, avatar } = useSelector(state => state.user.currentUser)
    const [anchor, setAnchor] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedUser = await updateUser(profileData)
        dispatch(updateCurrentUser(updatedUser.data))
    }
    return (
        <>
            <Box flex={4} p={2} sx={{ width: '100vh', mb: 20 }} component='form' onSubmit={handleSubmit} >
                <Container sx={{ padding: '3%' }} maxWidth='sm' >
                    <Typography mb={2} variant='h3' >Your Profile</Typography>
                    <Stack spacing={5}>
                        {
                            avatar ? (
                                <StyledAvatar sx={{ bgcolor: "red" }} aria-label="recipe" src={avatar} />
                            ) : (
                                <StyledAvatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                    {displayName.charAt(0)}
                                </StyledAvatar>
                            )
                        }
                        <Button variant='contained' sx={{ maxWidth: '20vh' }} onClick={(e) => setAnchor(e.currentTarget)} >Change Pic</Button>
                        <TextField onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })} label='Name' variant="outlined" sx={{ maxWidth: '30vh' }} defaultValue={displayName} name='name' />
                        <TextField onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} label='Username' variant="outlined" sx={{ maxWidth: '30vh' }} defaultValue={username} />
                        <TextField onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} label='Email' variant="outlined" sx={{ maxWidth: '30vh' }} defaultValue={email} />
                        <TextField label='Password' variant="outlined" sx={{ maxWidth: '30vh' }} placeholder='**********' />
                        <Button type='submit' variant="outlined" sx={{ maxWidth: '30vh' }} >Save</Button>
                    </Stack>
                </Container>
            </Box>
            <Menu
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                open={Boolean(anchor)}
            >
                <MenuItem>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => { setProfileData({ ...profileData, avatar: base64 }) }} />
                </MenuItem>
            </Menu>
        </>
    );
}

export default Profile;
