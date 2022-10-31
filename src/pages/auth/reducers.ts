import { AuthActionType, AuthState, User } from "./interfaces";


const reducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                isAuthenticated: true,
                user: action?.payload?.user as User,
                jwt: action.payload!.jwt,
            };
        case "UPDATE_USER_DATA":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user as User,
                jwt: action.payload!.jwt,
            };
        case "CLEAR_USER_DATA":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                jwt: null,
            };

        default:
            return state;
    }
};

export { reducer };
