import { IUserState, TUser, UserActions } from '../../utils/types';
import { authReducer as reducer } from './user-reducer';

const user: TUser = {
    email: 'email@mail.com',
    name: 'name1'
};

describe('auth reducer', () => {
    it('should return added order', () => {
        const state: IUserState = { user: null, resetPassword: true, loading: true }
        expect(reducer(state, { type: UserActions.SET_USER, user: user }))
            .toEqual(
                {
                    user: user,
                    resetPassword: true,
                    loading: false
                }
            )
    })

    it('should set up loading flag on api fetch', () => {
        const state: IUserState = { user: user, resetPassword: true, loading: false }
        expect(reducer(state, { type: UserActions.GET_USER_REQUEST }))
            .toEqual(
                {
                    user: user,
                    resetPassword: true,
                    loading: true
                }
            )
    })

    it('should reset loading flag when request failed', () => {
        const state: IUserState = { user: user, resetPassword: true, loading: true }
        expect(reducer(state, { type: UserActions.GET_USER_FAILED }))
            .toEqual(
                {
                    user: user,
                    resetPassword: true,
                    loading: false
                }
            )
    })

    it('should set up forgot password flag', () => {
        const state: IUserState = { user: user, resetPassword: false, loading: true }
        expect(reducer(state, { type: UserActions.FORGOT_PASSWORD_SUCCESSFUL }))
            .toEqual(
                {
                    user: user,
                    resetPassword: true,
                    loading: true
                }
            )
    })

    it('should reset forgot password flag when request failed', () => {
        const state: IUserState = { user: user, resetPassword: true, loading: true }
        expect(reducer(state, { type: UserActions.FORGOT_PASSWORD_FAILED }))
            .toEqual(
                {
                    user: user,
                    resetPassword: false,
                    loading: true
                }
            )
    })

    it('should reset forgot password flag when reset request failed', () => {
        const state: IUserState = { user: user, resetPassword: true, loading: true }
        expect(reducer(state, { type: UserActions.RESET_PASSWORD_FAILED }))
            .toEqual(
                {
                    user: user,
                    resetPassword: false,
                    loading: true
                }
            )
    })

    it('should reset forgot password flag when reset request successful', () => {
        const state: IUserState = { user: user, resetPassword: true, loading: true }
        expect(reducer(state, { type: UserActions.RESET_PASSWORD_SUCCESSFUL }))
            .toEqual(
                {
                    user: user,
                    resetPassword: false,
                    loading: true
                }
            )
    })

}) 