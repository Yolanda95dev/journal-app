import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth"

export const NavBar = ({ drawerWidth = 240 }) => {


    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(startLogout())
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { xs: 'flex', sm: 'none' } }}>
                    <MenuOutlined />
                </IconButton>

                <Typography variant="h6" noWrap component='div' sx={{ flexGrow: 1 }}>JournalApp</Typography>
                <IconButton
                    color="error"
                    onClick={onLogout}
                >
                    <LogoutOutlined />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}

