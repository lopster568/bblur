import { Card, CardActions, CardContent, CardMedia, IconButton, Checkbox, Menu, MenuList, Typography, Button, TextField, Skeleton, Grid, CardHeader } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../api/post";
import AuthorHeader from "../AuthorHeader/author-header.component";
import CommentSection from "../CommentSection/comment-section.component";
import moment from "moment";
import PopMenuItem from "../PopMenuItem/pop-menu-item.component";
import { savePost } from "../../api/post";
import { Box, Container, Stack } from "@mui/system";
import { useNavigate } from "react-router";

// ICONS
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles'
import { setAlert } from "../../redux/alert/alert.actions";

const StyledCard = styled(Card)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginBottom: '30px'
    }
}))

const Post = ({ post, liked, edit }) => {
    const [postAnchor, setPostAnchor] = useState(null)
    const [expanded, setExpanded] = useState(false)
    const [editPostData, setEditPostData] = useState({})
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.currentUser ? state.user.currentUser._id : null)

    const navigate = useNavigate()
    return (
        <StyledCard >
            {
                <>
                    <AuthorHeader author={post?.author} id={post?.author._id} subtitle={moment(post?.createdAt).fromNow()} setAnchor={setPostAnchor} />
                    <CardMedia
                        loading="lazy"
                        component="img"
                        height="20%"
                        image={post?.img}
                        alt="Card Image"
                    />
                    <CardContent>
                        {
                            edit ? (
                                <Stack spacing={2} >
                                    <Typography variant="subtitle1" >Caption</Typography>
                                    <TextField sx={{ width: '100%' }} size="small" placeholder={'Change Caption'} defaultValue={post?.caption} onChange={(e) => setEditPostData({ ...editPostData, caption: e.target.value })} />
                                    <Typography variant="subtitle1" >Tags</Typography>
                                    <TextField sx={{ width: '100%' }} multiline rows={3} size="small" placeholder={'Change Caption'} defaultValue={post?.tags} onChange={(e) => setEditPostData({ ...editPostData, tags: e.target.value })} />
                                    <Button variant="contained" sx={{ width: '100%' }} onClick={() => { }} >Save</Button>
                                </Stack>
                            ) : (
                                <Typography variant="h6" color="text.secondary">
                                    {post?.caption}
                                </Typography>
                            )
                        }

                        <Typography variant='caption' color="text.secondary">
                            Likes: {post?.likes?.length} Comments: {post?.comments?.length}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => likePost(post?._id)} >
                            <Checkbox icon={<FavoriteOutlinedIcon />} checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />} defaultChecked={liked} />
                        </IconButton>
                        <IconButton onClick={() => setExpanded(!expanded)} aria-label="share">
                            <ModeCommentIcon
                                expand={expanded.toString()}
                                aria-expanded={expanded}
                                aria-label="show more"
                            />
                        </IconButton>
                        <IconButton aria-label="add to favorites" onClick={async () => {
                            try {
                                await savePost(post?._id)
                            } catch (err) {
                                dispatch(setAlert(err.response.data.message))
                            }
                        }} >
                            <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
                        </IconButton>
                    </CardActions>

                    <CommentSection expanded={expanded} comments={post?.comments} postId={post?._id} />
                    <Menu
                        anchorEl={postAnchor}
                        onClose={() => {
                            setPostAnchor(null)
                            setDeleteConfirmation(false)
                        }}
                        open={Boolean(postAnchor)}
                    >
                        {
                            deleteConfirmation ? (
                                <MenuList>
                                    <PopMenuItem menuItemName={"Confirm"} sx={{ backgroundColor: "red" }} clickHandler={() => { deletePost(post?._id) }} icon={<CheckCircleIcon sx={{ color: "green" }} />} />
                                    <PopMenuItem menuItemName={"Cancel"} clickHandler={() => setDeleteConfirmation(false)} icon={<CancelIcon sx={{ color: "red" }} />} />
                                </MenuList>
                            ) : (
                                <MenuList>
                                    {
                                        post?.author?._id === userId ? (
                                            <MenuList sx={{ p: 0 }} >
                                                <PopMenuItem menuItemName={"Edit"} clickHandler={() => navigate(`/post/edit/${post?._id}`)} icon={<EditIcon />} />
                                                <PopMenuItem menuItemName={"Delete"} clickHandler={() => setDeleteConfirmation(true)} postId={post?._id} icon={<DeleteIcon />} />
                                            </MenuList>
                                        ) : null
                                    }
                                    <PopMenuItem menuItemName={"Share"} icon={<ShareIcon />} clickHandler={() => { navigator.clipboard.writeText(`http://localhost:3000/post/${post?._id}`) }} />
                                    <PopMenuItem menuItemName={"Report"} icon={<FlagIcon />} clickHandler={() => { }} />
                                </MenuList>
                            )
                        }
                    </Menu>
                </>
            }
        </StyledCard >

    );
}



export default Post;