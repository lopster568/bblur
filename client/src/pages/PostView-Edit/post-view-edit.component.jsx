import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../../api/post";
import Post from "../../components/PostItem/post.component";
import { Stack, Box } from "@mui/material";
import { Container } from "@mui/system";
import Rightbar from "../../components/Rightbar/rightbar.component";
import Sidebar from "../../components/Sidebar/sidebar.component";
import Add from "../../components/Add/add.component";

function PostViewEdit({ edit }) {
    const params = useParams()
    const [postData, setPostData] = useState([])
    useEffect(() => {
        getPost(params.id).then(resp => setPostData(resp.data))
    }, [])

    return (
        <Box flex={4} p={2} sx={{ width: '100%', height: '95vh' }} >
            <Container sx={{ padding: '3%' }} maxWidth='sm' >
                {
                    edit ? (
                        <Post post={postData} edit={true} />
                    ) : (
                        <Post post={postData} />
                    )
                }
            </Container>
        </Box>
    );
}

export default PostViewEdit;