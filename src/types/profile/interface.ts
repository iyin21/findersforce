export interface ProfileResponse {
    accountType: string
    email: string
    firstName: string
    lastName: string
    phone: string
    location: string
    companyName: string
    profileImageUrl: any
    twoFa_enabled?: boolean
    depotCompany: string
    company: {
        _id: string
        name: string
        logo: string
    }
}

export interface ProfileRequest {
    firstName: string
    lastName: string
    password: string
    passwordConfirm: string
    inviteCode: string | null
    courseLink: string
    subscriptionPlan: string
}

export interface InviteProfileResponse {
    jwt: {
        token: string
    }
    user: {
        depotCompany: {
            _id: string
            name: string
        }
    }
}
