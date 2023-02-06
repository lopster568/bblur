import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "../PostItem/post.component";

const Feed = ({posts}) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const userId = currentUser?._id

    return (
        <Box sx={{ minHeight: '100vh'}} m={0} flex={4} p={2}  >
            {
                posts.map(post => {
                    const index = post.likes.findIndex(id => id === userId)
                    return (
                        <Post key={post._id} post={post} liked={(index === -1) ? false : true} />
                    )
                })
            }
        </Box>
    )
}

export default Feed