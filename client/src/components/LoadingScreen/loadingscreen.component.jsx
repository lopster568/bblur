import { Typography } from '@mui/material'
// import Lottie from 'react-lottie'
import * as LOADING from '../../assets/loading.json'
 
const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LOADING.default,
        renderSettings: {
            preserveAspectRatio : "xMidYMid slice"
        }
    }
    return (
        <div style={{height: "100vh"}} > 
            {/* <Lottie options={defaultOptions}   /> */}
        </div>
    )
}

export default Loading