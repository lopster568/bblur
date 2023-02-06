import { FormControl, InputLabel, OutlinedInput, InputAdornment, CardContent, IconButton, Collapse, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { commentPost } from "../../api/post";
import { useSelector } from "react-redux";
import moment from 'moment'
import SendIcon from '@mui/icons-material/Send';
const CommentSection = ({ comments, expanded, postId }) => {
    const [comment, setComment] = useState(false)
    const [commentAnchor, setCommentAnchor] = useState(null)

    const currentUser = useSelector(state => state.user.currentUser)

    const handleSubmit = (e) => {
        e.preventDefault()
        commentPost(postId, { comment })
    }

    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent >
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel >Comment</InputLabel>
                        <OutlinedInput
                            onChange={(e) => setComment(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton type='submit' variant='contained' ><SendIcon /></IconButton>
                                </InputAdornment>
                            }
                            label='Comment'
                        />
                    </FormControl>
                </Box>
                <List sx={{ width: '100%', maxWidth: { lg: '80%' } }}>
                    {
                        comments?.map(({ _id, user, comment, createdAt }) => {
                            return (
                                <ListItem alignItems="flex-start" key={_id}>
                                    <ListItemAvatar>
                                        <Avatar alt={"Comment Author"} src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.displayName}
                                        secondary={
                                            <>

                                                {moment(createdAt).fromNow()}
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {`: ${comment}`}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            )
                        })
                    }
                    <Divider variant="inset" component="li" />
                </List>
            </CardContent>
        </Collapse>
    )
}

export default CommentSection
//     < Menu
// anchorEl = { commentAnchor }
// onClose = {() => setCommentAnchor(null)}
// open = { Boolean(commentAnchor) }
//     >
//     <MenuList>
//         <MenuItem>
//             <ListItemIcon>
//                 <FlagIcon fontSize="small" />
//             </ListItemIcon>
//             <Typography variant="inherit" noWrap>
//                 Report
//             </Typography>
//         </MenuItem>
//         {
//             author === comments
//         }
//     </MenuList>
//             </Menu >