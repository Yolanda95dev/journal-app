import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import { checkingAuthentication } from '../../../src/store/auth/thunks'
import { checkingCredentials } from '../../../src/store/auth'

jest.mock('../../../src/firebase/providers')

describe('Tests in thunks', () => {

    const dispatch = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    test('should call checkingCredentials', async () => {

        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())


    })

})

