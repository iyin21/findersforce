export interface jwtData {
    token: string
    expiresAt: number
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    accountType: string;
    verified: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    accountActivated?: boolean;
    averageRating?: number;
    bio?: string;
    banned?: boolean;
    qualification?: Array<string>;
    profileImageUrl?: any;
    emailVerified?: boolean;
    resume?: any;
    skillSets?: Array<string>;
    username?: string;
    twoFa_enabled?: boolean;
    twoFa_type?: any;
    depotRole: string
}

export interface LoginResponse {
    status: string
    message: string
    data: Data
}

export interface Data {
    user: User
    jwt: jwtData | null
}

export type AuthState = {
    isAuthenticated: boolean
    user: User | null
    jwt: jwtData | null
    persist: boolean
}

// An interface for our actions
export type AuthActionType = {
    type: "SET_USER_DATA" | "UPDATE_USER_DATA" | "CLEAR_USER_DATA"
    payload?: LoginResponse["data"]
}
