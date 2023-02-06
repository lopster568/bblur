import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getSavedPosts } from "../../api/post";
import ImageSection from "../../components/ImageSection/image-section.component";


function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([])
    useEffect(() => {
        getSavedPosts().then(resp => setSavedPosts(resp.data))
    }, [])
    return (
        <Box flex={4} p={2} sx={{ width: '100%', height: '95vh' }}  >
            <Paper sx={{ padding: '3%', maxWidth: 'sm' }} elevation={3}   >
                <Typography variant='h4' >Your Saved Posts</Typography>
                <ImageSection posts={savedPosts} />
            </Paper>
        </Box>
    );
}

export default SavedPosts;