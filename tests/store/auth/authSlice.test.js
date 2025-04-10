import { describe, test, expect } from '@jest/globals'
import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState, testUser } from '../../fixtures/authFixtures'

describe('Tests in authSlice', () => {
    test('should return the initialState and be called auth', () => {

        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)

    })

    test('should authenticated', () => {

        const state = authSlice.reducer(initialState, login(testUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: testUser.uid,
            email: testUser.email,
            displayName: testUser.displayName,
            photoURL: testUser.photoURL,
            errorMessage: null,
        })

    })

    test('should logout without arguments', () => {

        const state = authSlice.reducer(initialState, logout(testUser))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })

    })

    test('should logout and display an error message', () => {

        const errorMessage = 'Credentials incorrect'
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: errorMessage }))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        })

    })

    test('should change the state to checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')
    })

})
