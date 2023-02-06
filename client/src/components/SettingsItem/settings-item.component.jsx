import { Grid, Typography, Switch } from "@mui/material";
import { ModeNight } from "@mui/icons-material";
import { Box, Stack } from "@mui/system";

const SettingsItem = ({ title, subtitle_1, subtitle_2, checked, handleChange, icon }) => {
    return (
        <>
            <Grid item>
                <Typography variant='h6' >{title}</Typography>
                <Typography variant='p' >{subtitle_1}<br /> {subtitle_2}</Typography>
            </Grid>
            <Grid item>
                <Stack direction="row" justifyContent="space-between" >
                    <Box>
                        {
                            icon ? (
                                icon
                            ) : null
                        }
                    </Box>
                    <Box>
                        {
                            handleChange ? (
                                <Switch checked={checked} onChange={handleChange} />
                            ) : (
                                <Switch checked={checked} />
                            )
                        }
                    </Box>
                </Stack>
            </Grid>
        </>
    )
}

export default SettingsItem