import Feed from "../../components/Feed/feed.component";
import { useEffect, useState } from "react";
import { getPosts } from '../../api/post.js'
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../../redux/post-loading/post-loading.actions";
import PostLoadingSkeleton from "../../components/PostLoadingSkeleton/post-loading-skeleton.component";
import { setAlert } from "../../redux/alert/alert.actions";

const Discover = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.post_loading)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPosts().then(resp => {
            setPosts(resp.data)
            dispatch(toggleLoading())
        })
        return () => {
            dispatch(toggleLoading())
        } 
    }, [])

    return (
        isLoading ? (
            <PostLoadingSkeleton />
        ) : (
            <Feed posts={posts} />
        )
    );
}

export default Discover;