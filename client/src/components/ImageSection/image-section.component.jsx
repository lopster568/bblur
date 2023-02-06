import { ImageList, ImageListItem, ListItemButton } from "@mui/material"

const ImageSection = ({ posts }) => {
    return (
        <ImageList sx={{ width: '100%', height: '100%', overflowY: 'hidden' }} gap={5} cols={3} rowHeight={200}>
            {posts?.map((post) => (
                <ImageListItem key={post._id}>
                    <img
                        src={post.img}
                        srcSet={post.img}
                        alt={post.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default ImageSection