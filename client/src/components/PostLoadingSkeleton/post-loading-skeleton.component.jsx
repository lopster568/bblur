import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginBottom: '30px'
    }
}))

const PostLoadingSkeleton = () => (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }} m={0} flex={4} p={2}  >
        <StyledCard >
            <CardHeader
                avatar={
                    (<Skeleton animation="wave" variant="circular" width={40} height={40} />)
                }
                title={(<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />)}
                subheader={(<Skeleton animation="wave" height={10} width="40%" />)}
            />
            <Skeleton variant="rectangular" sx={{ height: '430px' }} />
            <CardContent>
                <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
        </StyledCard>
    </Box>
)

export default PostLoadingSkeleton