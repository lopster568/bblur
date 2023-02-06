import { Typography, Box, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, Divider, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'
import { getSavedPosts } from '../../api/post.js'
import { TagLink } from "./rightbar.styled.jsx";

const Rightbar = () => {
    const navigate = useNavigate()
    const [savedPosts, setSavedPosts] = useState([])
    useEffect(() => {
        getSavedPosts().then(data => setSavedPosts(data.data))
    }, [])
    const location = useLocation()
    const currentUser = useSelector(state => state.user.currentUser)
    const isAuthPage = () => {
        if (location.pathname === '/login' || location.pathname === '/signup') return true
        return false
    }
    return (
        isAuthPage() || !currentUser ? (
            null
        ) : (
            <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }} >
                <Box position={"fixed"} width={300}>
                    <Typography variant='h6' fontWeight={100} >Trending Tags 🔥</Typography>
                    <TagLink to='/' >#this </TagLink>
                    <TagLink to='/' >#that </TagLink>
                    <TagLink to='/' >#what </TagLink>
                    <TagLink to='/' >#coz </TagLink>
                    <List>
                        <Typography variant='h6' fontWeight={100} mt={2} mb={2} >Saved Posts </Typography>
                        {
                            (savedPosts.length < 1) ? (
                                <Typography >'No Saved Posts!'</Typography>
                            ) : null
                        }
                        <ListItemButton onClick={() => navigate('/saved-posts')} >
                            <ImageList cols={3} rowHeight={100} gap={5} sx={{ overflowY: 'hidden' }} >
                                {
                                    savedPosts.slice(2).map((e) => (
                                        <ImageListItem key={e._id} >
                                            <img src={e.img} />
                                        </ImageListItem>
                                    ))
                                }
                            </ImageList>
                        </ListItemButton>
                    </List>
                    <Typography variant='h6' fontWeight={100} >Activities</Typography>
                </Box>
            </Box>
        )

    );
}

export default Rightbar;