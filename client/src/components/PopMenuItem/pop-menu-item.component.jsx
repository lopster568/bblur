import { ListItemIcon, MenuItem, Typography } from "@mui/material";

const PopMenuItem = ({menuItemName, icon, clickHandler, postId}) => {
    return (
        <MenuItem onClick={() => clickHandler(postId) } >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
                {menuItemName}
            </Typography>
        </MenuItem>
    )
}

export default PopMenuItem