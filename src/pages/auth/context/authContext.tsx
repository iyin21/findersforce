import React, { createContext } from "react";
import { AuthActionType, AuthState } from "../interfaces";
import { reducer } from "../reducers";


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    jwt: null,
};


const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthActionType>;
}>({
    state: {
        isAuthenticated: false,
        user: null,
        jwt: null
    },
    dispatch: () => {},
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;