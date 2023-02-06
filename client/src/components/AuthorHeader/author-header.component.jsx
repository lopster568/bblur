import { Avatar, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router";

const AuthorHeader = ({ author, subtitle, setAnchor, noAction, id }) => {
    const navigate = useNavigate()
    return (
        <CardHeader
            avatar={
                author?.avatar ? (
                    <IconButton sx={{m: 0, p: 0}} onClick={() => navigate(`/user/${id}`)} >
                        <Avatar alt={"User Avatar"} src={author?.avatar} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => navigate("/")} >
                        <Avatar sx={{ bgcolor: `red` }} alt={"User Avatar"}>
                            {author?.displayName?.charAt(0)}
                        </Avatar>
                    </IconButton>

                )
            }
            action={
                noAction ? null : (
                    <IconButton aria-label="settings" onClick={(e) => setAnchor(e.currentTarget)} >
                        <MoreVertIcon />
                    </IconButton>
                )
            }
            title={author?.displayName}
            subheader={subtitle}
        />
    )
}

export default AuthorHeader