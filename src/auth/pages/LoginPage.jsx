import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'


const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const { email, password, onInputChange } = useForm(formData)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (event) => {
        event.preventDefault()
        console.log({ email, password })
        dispatch(startLoginWithEmailPassword({ email, password }))
        //dispatch(checkingAuthentication())
    }

    const onGoogleSignIn = () => {
        console.log('OnGoogleSignIn')
        dispatch(startGoogleSignIn())
    }
    return (

        <AuthLayout title="Login">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid containter component="form" spacing={2} rowSpacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            size="small"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            size="small"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid
                        size={{ xs: 12, sm: 6 }}
                        // eslint-disable-next-line no-extra-boolean-cast
                        display={!!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            disabled={isAuthenticating}
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            disabled={isAuthenticating}
                            variant="contained"
                            fullWidth
                            startIcon={<Google />}
                            onClick={onGoogleSignIn}
                        >
                            <Typography>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent='end' sx={{ mt: 2 }}>
                    <Link component={RouterLink} color="inherit" to="/auth/register">
                        Create an account
                    </Link>
                </Grid>
            </form>
        </AuthLayout >
    )
}

