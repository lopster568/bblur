import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'

//ICONS
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector } from 'react-redux';

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
    display: "none",
    width: '100vw',
    [theme.breakpoints.down("sm")]: {
        display: "block"
    }
}))

function BottomNav() {
    const currentUser = useSelector(state => state.user.currentUser)
    const navigate = useNavigate()
    return (
        currentUser ? (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, marginLeft: '0px'  }} elevation={3}>
            <StyledBottomNav sx={{pl: '16px'}} onChange={() => { }}>
                <BottomNavigationAction
                    label="Home"
                    value="Feed"
                    icon={<HomeIcon />}
                    onClick={() => navigate('/')}
                />
                <BottomNavigationAction
                    label="Discover"
                    value="Discover"
                    icon={<ExploreIcon />}
                    onClick={() => navigate('/discover')}
                />
                <BottomNavigationAction
                    label="Circle"
                    value="Circle"
                    icon={<PeopleIcon />}
                    onClick={() => navigate('/circle')}
                />
                <BottomNavigationAction
                    label="Settings"
                    value="Settings"
                    icon={<SettingsIcon />}
                    onClick={() => navigate('/settings')}
                />
            </StyledBottomNav>
        </Paper> ) : (
            null
        )
    );
}

export default BottomNav;