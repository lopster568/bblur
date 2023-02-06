import { AppBar, Grid, Typography, Box, InputBase, Badge, Avatar, MenuItem, Menu, Button, MenuList, List, ListItem, Divider, ListItemText, ListItemAvatar, IconButton, Toolbar } from "@mui/material";
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StyledToolbar, UserBox, Search, Icons } from './navbar.styled';
import { setCurrentUser } from "../../redux/user/user.actions";
import AdjustIcon from '@mui/icons-material/Adjust';
import { Stack } from "@mui/system";
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const theme = useSelector(state => state.theme.mode)
    const [avatarAnchor, setAvatarAnchor] = useState(null)
    const [notificationAnchor, setNotificationAnchor] = useState(null)
    const logout = () => {
        localStorage.clear()
        dispatch(setCurrentUser({ user: null, token: null }))
        navigate('/login')
    }
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' onClick={() => navigate('/')} >
                    <AdjustIcon />
                </IconButton>
                <Typography variant='h5' sx={{ flexGrow: 1 }} >B.Blur</Typography>
                {
                    !currentUser ? (
                        <>
                            <Stack spacing={2} direction={'row'} >
                                <Button variant="contained" color="warning" onClick={() => navigate('/login')}>Login</Button>
                                <Button variant="contained" color="error" onClick={() => navigate('/signup')} >Sign Up</Button>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Badge badgeContent={3} color="error" sx={{mr: 2}} >
                                <Notifications onClick={(e) => setNotificationAnchor(e.currentTarget)} />
                            </Badge>
                            {
                                currentUser.avatar ? (
                                    <IconButton onClick={(e) => setAvatarAnchor(e.currentTarget)}>
                                        <Avatar  alt={currentUser.displayName}  sx={{ width: 50, height: 50 }} src={currentUser.avatar} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={(e) => setAvatarAnchor(e.currentTarget)}>
                                        <Avatar alt={currentUser.displayName}  sx={{ width: 50, height: 50 }}>{currentUser.displayName.charAt(0)}</Avatar>
                                    </IconButton>
                                )
                            }
                            {/* --------------------------------------------MENU STUFF------------------------------------------ */}
                            <Menu
                                anchorEl={avatarAnchor}
                                onClose={() => setAvatarAnchor(null)}
                                open={Boolean(avatarAnchor)}
                            >
                                <MenuItem onClick={() => navigate('/profile')} >Profile</MenuItem>
                                <MenuItem onClick={() => navigate('/saved-posts')} >Saved</MenuItem>
                                <MenuItem onClick={logout} >Logout</MenuItem>
                            </Menu>
                            <Menu
                                anchorEl={notificationAnchor}
                                onClose={() => setNotificationAnchor(null)}
                                open={Boolean(notificationAnchor)}
                            >
                                <MenuList>
                                    <List sx={{ width: '100%', maxWidth: 360 }}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Brunch this weekend?"
                                                secondary={"I'll be in your neighborhood doing errands this…"}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Brunch this weekend?"
                                                secondary={"I'll be in your neighborhood doing errands this…"}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Brunch this weekend?"
                                                secondary={"I'll be in your neighborhood doing errands this…"}
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </List>
                                </MenuList>
                            </Menu>
                        </>
                    )
                }
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;

