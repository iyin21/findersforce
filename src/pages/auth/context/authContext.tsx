import React, { useState, createContext } from "react"

export interface authType {
    email: string
    password: string
    accessToken: string
    user: any
}

const initialContextState = {
    email: "",
    password: "",
    accessToken: "",
    user: null,
}

export interface authContextType {
    auth: authType
    setAuth: React.Dispatch<React.SetStateAction<authType>>
}
//{auth:{email:"", }}
const AuthContext = createContext<authContextType>({
    auth: initialContextState,
    setAuth: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<authType>(initialContextState)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
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
