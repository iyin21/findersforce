export default interface AllManagersResponse {
    message: string
    status: string
    data: Manager[]
}

export interface Manager {
    _id: string
    username: string
    firstName: string
    lastName: string
    depotCompany: DepotCompany
    depotRegion: DepotRegion
    email: string
    accountType: string
    depotRole: string
    profileImageUrl: null
    resumeUrl: null | string
    emailVerified: boolean
    accountActivated: boolean
    banned: boolean
    skillset: any[]
    qualification: any[]
    bio: null | string
    averageRating: number
    twoFa_enabled: boolean
    twoFa_type: null | string
    createdAt: string
    updatedAt: string
    __v: number
}

interface DepotCompany {
    _id: string
    depot: string
    name: string
    bio: string
    address: string
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: string
}

interface DepotRegion {
    _id: string
    depotCompany: string
    address: string
    createdBy: {
        _id: string
        firstName: string
        lastName: string
        accountType: string
        depotRole: string
    }
    createdAt: string
    updatedAt: string
    location: {
        type: string
        coordinates: number[]
        formattedAddress: string
        street: string
        city: string
        state: string
        zipcode: string
        country: string
        _id: string
    }
    __v: number
}
