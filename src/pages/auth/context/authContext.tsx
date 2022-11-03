import React, { createContext } from "react"
import { AuthActionType, AuthState } from "../../../types/auth/auth-interfaces"
import { reducer } from "../reducers"

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    jwt: null,
    persist: false,
}

const AuthContext = createContext<{
    state: AuthState
    dispatch: React.Dispatch<AuthActionType>
}>({
    state: {
        isAuthenticated: false,
        user: null,
        jwt: null,
        persist: false,
    },
    dispatch: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export const useAuthContext = () => {
    const context = React.useContext(AuthContext)
    // if (context === undefined) {
    //     throw new Error("useAuthContext must be used within a AuthContextProvider");
    // }
    return context
}
