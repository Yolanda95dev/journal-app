import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"

import { startCreatingUserWithEmailPassword } from "../../store/auth"

const formData = {
    email: 'yolanda@google.com',
    password: '123456',
    displayName: 'Yolanda López'
}

const formValidations = {
    email: [(value) => value.includes('@'), 'Email must have @'],
    password: [(value) => value.length >= 6, 'Password must have more than 6 letters'],
    displayName: [(value) => value.length >= 1, 'Name is required']
}

export const RegisterPage = () => {

    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth)
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const {
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations)

    const onSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)

        if (!isFormValid) return

        dispatch(startCreatingUserWithEmailPassword(formState))

    }

    return (

        <AuthLayout title="Create an account">
            <h1>FormValid: {isFormValid ? 'Valid' : 'Incorret'}</h1>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid containter component="form" spacing={2} rowSpacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            id="name"
                            label="Name"
                            type="type"
                            placeholder="Name"
                            size="small"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 1 }}>
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
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 1 }}>
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
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6
                        }}
                        // eslint-disable-next-line no-extra-boolean-cast
                        display={!!errorMessage ? '' : 'none'}
                    >
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            disabled={isCheckingAuthentication}
                            type="submit"
                            variant="contained"
                            fullWidth>
                            Create an account
                        </Button>
                    </Grid>

                </Grid>

                <Grid container justifyContent='end' sx={{ mt: 2 }}>
                    <Typography sx={{ mr: 1 }}>Alright an account?</Typography>
                    <Link component={RouterLink} color="inherit" to="/auth/login">
                        Login
                    </Link>
                </Grid>
            </form>
        </AuthLayout >
    )
}

