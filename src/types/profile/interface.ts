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
