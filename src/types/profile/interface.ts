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
    company: {
        _id: string
        name: string
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
