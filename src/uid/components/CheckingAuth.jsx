import { Box, CircularProgress } from "@mui/material"

export const CheckingAuth = () => {
    return (
        <Box component="main"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: '100vh',
                backgroundColor: 'primary.main',
            }}
        >

            <Box component="section" 
            flexDirection='row'
            justifyContent='center'
            >
                <CircularProgress color="warning"/>
            </Box>
        </Box>
    )
}

