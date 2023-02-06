import { Fab, Modal, Tooltip, Typography, Box, Avatar, TextField, ButtonGroup, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react";
import { Stack } from "@mui/system";
import { EmojiEmotions, VideoCameraBack, Image, PersonAdd, DateRange } from "@mui/icons-material";
import { StyledModal, UserBox } from "./add.styled";
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from "../../api/post";
import { useLocation, useNavigate } from "react-router";
import { setAlert } from "../../redux/alert/alert.actions";
const Add = () => {
    const navigate = useNavigate()
    const disptach = useDispatch()
    const [open, setOpen] = useState(false)
    const [postData, setPostData] = useState(null)
    const currentUser = useSelector(state => state.user.currentUser)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("postImg", postData.img)
        data.append("caption", postData.caption)
        data.append("tags", postData.tags)
        const response = await createPost(data)
        disptach(setAlert(response.data.message))
        navigate("/")
        setOpen(false)
    }
    const location = useLocation()
    const isAuthPage = () => {
        if (location.pathname === '/login' || location.pathname === '/signup') return true
        return false
    }
    return (
        isAuthPage() || !currentUser ? (
            null
        ) : (
            <>
                <Tooltip title="Add" sx={{ position: "fixed", bottom: 42, left: { xs: "calc(50% - 30px)", md: 30 } }} >
                    <Fab color="primary" aria-label="Add" onClick={() => setOpen(true)}  >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <StyledModal
                    open={open}
                    onClose={() => setOpen(false)} >
                    <Box height={500} width={320} borderRadius={5} p={3} bgcolor={'background.default'} color={"text.primary"} >
                        <Typography variant="h6" color={"gray"} textAlign='center' >
                            Create a Post
                        </Typography>
                        <UserBox>
                            {
                                currentUser.avatar ? (
                                    <Avatar sx={{ width: 30, height: 30 }} src={currentUser.avatar} alt={currentUser.displayName} />
                                ) : (
                                    <Avatar sx={{ width: 30, height: 30 }} alt={currentUser.displayName} >{currentUser.displayName.charAt(0)}</Avatar>
                                )
                            }
                            <Typography variant="span" fontWeight={500} >{currentUser.displayName}</Typography>
                        </UserBox>
                        <Box component='form'>
                            <TextField sx={{ width: "100%" }}
                                variant='standard'
                                rows={3}
                                multiline
                                placeholder="What's on Your Mind?"
                                onChange={(e) => setPostData({ ...postData, caption: e.target.value })}
                            />
                            <Stack direction={"row"} gap={1} mt={2} mb={3} >
                                <EmojiEmotions color='primary' />
                                <Image color='secondary' />
                                <VideoCameraBack color='success' />
                                <PersonAdd color='error' />
                            </Stack>
                            <Typography>Please Choose an Image</Typography>
                            <Button variant="contained" component="label">
                                Upload
                                <input onChange={(e) => setPostData({ ...postData, img: e.target.files[0] })} hidden accept="image/*" type="file" />
                            </Button>
                            {/* <IKContext
                                publicKey={'public_RR6bfJBYwkidUbZcaYUvdNfv2Ow='}
                                urlEndpoint={'https://ik.imagekit.io/xcuqahb2st38'}
                                authenticationEndpoint={"http://localhost:8000/api/auth"}
                            >
                                <IKUpload
                                    fileName="test-upload.png"
                                    onError={(err) => console.log(err)}
                                    onSuccess={(res) => setPostData({...postData, img: res.url })}
                                />
                            </IKContext> */}
                            <Typography>OR</Typography>
                            <TextField size="small" placeholder="Image link" onChange={(e) => setPostData({ ...postData, img: e.target.value })} sx={{ width: "100%", mb: 2 }} />
                            <Typography>Add Tags!</Typography>
                            <TextField sx={{ width: "100%" }}
                                variant='standard'
                                rows={2}
                                multiline
                                placeholder="Separated by commas"
                                onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                            />
                            <ButtonGroup sx={{ mt: 4 }} fullWidth variant="contained" >
                                <Button sx={{ width: '90%' }} onClick={handleSubmit} >Post</Button>
                            </ButtonGroup>

                        </Box>
                    </Box>
                </StyledModal>
            </>
        )
    );
}

export default Add;