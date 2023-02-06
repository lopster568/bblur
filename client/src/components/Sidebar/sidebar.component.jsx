import { List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { ModeNight } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/theme/theme.actions";

const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)
    const location = useLocation()
    const isAuthPage = () => {
        if (location.pathname === '/login' ||  location.pathname === '/signup' ) return true
        return false
    }
    return (
        isAuthPage() ? (
            null
        ) :
            (
                <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }} >
                <Box position={"fixed"}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component='a' onClick={() => navigate('/')} >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary='Feed' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component='a' onClick={() => navigate('/discover')} >
                                <ListItemIcon>
                                    <ExploreIcon />
                                </ListItemIcon>
                                <ListItemText primary='Discover' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component='a' onClick={() => navigate('/circle')} >
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary='Social Circle' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component='a' onClick={() => navigate('/settings')} >
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary='Settings' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component='a'>
                                <ListItemIcon>
                                    <ModeNight />
                                </ListItemIcon>
                                <Switch onChange={() => dispatch(toggleTheme())} checked={theme.mode === 'dark' ? true : false} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component='a' onClick={() => navigate('/about')} >
                                <ListItemText primary='About Us' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            )
    );
}

export default Sidebar