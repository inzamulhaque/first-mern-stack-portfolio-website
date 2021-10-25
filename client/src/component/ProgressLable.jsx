import React from 'react';
import { LinearProgress, Typography, Box } from "@material-ui/core";

const ProgressLable = (props) => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        </>
    )
}

export default ProgressLable;