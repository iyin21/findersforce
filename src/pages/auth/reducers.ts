import {
    AuthActionType,
    AuthState,
    User,
} from "../../types/auth/auth-interfaces"

const reducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                isAuthenticated: true,
                user: action?.payload?.user as User,
                jwt: action.payload!.jwt,
                persist: true,
            }
        case "UPDATE_USER_DATA":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user as User,
                jwt: action.payload!.jwt,
                persist: true,
            }
        case "CLEAR_USER_DATA":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                jwt: null,
                persist: false,
            }

        default:
            return state
    }
}

export { reducer }
