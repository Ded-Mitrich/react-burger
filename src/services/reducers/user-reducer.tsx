import { IUserAction, IUserState, UserActions } from '../../utils/types';

const authInitialState: IUserState = {
    user: null,
    resetPassword: false,
    loading: false
};

export const authReducer = (state = authInitialState, action: IUserAction): IUserState => {
    switch (action.type) {

        case UserActions.FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.FORGOT_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: true,
            };
        }

        case UserActions.RESET_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPassword: false,
            };
        }

        case UserActions.GET_USER_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case UserActions.GET_USER_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }

        case UserActions.SET_USER: {
            return {
                ...state,
                user: action.user ?? null,
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}