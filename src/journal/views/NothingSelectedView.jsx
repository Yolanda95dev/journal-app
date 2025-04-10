import { StarOutline } from "@mui/icons-material"
import { Box, Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Box component="main"
            className="animate__animated animate__fadeIn animate__faster"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 'calc(100vh-110px)',
                backgroundColor: 'primary.main',
                borderRadius: 3
            }}
        >
            <Grid item xs={12}>
                <StarOutline sx={{ fontSize: 50, color: 'white', mr: 1 }} />
            </Grid>
            <Grid item xs={12}>
                <Typography color="white" variant="h6">Selecciona o crea una entrada</Typography>
            </Grid>
        </Box>
    )
}

