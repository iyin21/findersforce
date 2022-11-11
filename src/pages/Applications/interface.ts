
export interface ApplicationResponse {
    status: true
    count: number
    pagination: {
        next: Pagination
        prev: Pagination
    }
    data: Data[]
}
export interface ApplicationDetailsResponse {
    status: string
    message: string
    data: Data
}

export interface Data {
    _id: string
    status: string
    jobListing: JobListing
    user: User
    experience: number
    createdAt: Date
    updatedAt: Date
    depot: string
    _v: number
    completedShfts: number;
    certificates: Certificates[];
    jobMatchPercentage:number;
}
export interface Certificates {
    _id:string;
    user: string;
    name: string;
    status: string;
    issuingOrganisation: string;
    credentialId: string;
    dateIssued: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    deleted: boolean
    

}
export interface JobListing {
    _id: string
    companyName: string
    jobType: Job
    depot: User
    jobDate: Date
    shiftStartTime: string
    shiftEndTime: Date
    shiftDurationInHours: number
    jobMeetingPoint: string
    jobAccessibleTo: string
    operativeIds: string[]
    numberOfOpsRequired: number
    jobQualification: Job
    jobRate: JobRate
    jobDescription: string
    jobLocation: JobLocation
    additionalInfoImageUrls: any[]
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    jobMatchPercentage: number
    hasApplied: boolean
    hasFavorited: boolean
    endedShift: boolean
}

export interface User {
    _id: string
    username: string
    firstName: string
    lastName: string
    email: string
    averageRating: number
    resumeUrl: string
    bio: string
    profileImageUrl: string
    createdAt: Date
}

export interface JobLocation {
    _id: string
    type: string
    coordinates: number[]
    formattedAddress: string
    street: string
    city: string
    state: string
    zipcode: string
    country: string
}

export interface Job {
    _id: string
    name: string
    jobQualificationCategoryId?: Job
    createdAt: Date
    updatedAt: Date
    description?: string
    jobTypeCategoryId?: string
}

export interface JobRate {
    _id: string
    currency: string
    jobQualification: string
    jobRatePerHourDisplayedToDepot: number
    jobRatePerHourDisplayedToOp: number
    depot: string
}

export interface Pagination {
    next: Next
    prev: Next
}

export interface Next {}

export interface ShiftResponse {
    message: string
    status: string
    data: {
        currentPage: 1
        nextPage: null
        prevPage: null
        totalRecords: number
        totalPages: number

        results: Result[]
    }
}

export interface Result {
    jobMatchPercentage: string;
    cancelReason: string
    cancelReasonMoreDetails: string
    cancelStatus: boolean
    clockInLocationCoordinates: string
    clockInStatus: boolean
    clockInTime: null | Date
    clockOutLocationCoordinates: null
    clockOutStatus: boolean
    clockOutTime: null | Date
    createdAt: Date
    depot: {
        _id: string
        username: string
        firstName: string
        lastName: string
        accountActivated: boolean
        accountType: string
        averageRating: number
        banned: boolean
        companyName: string
        createdAt: Date
        email: string
        emailVerified: boolean
        gender: string
        password: string
        qualification: string[]
        skillset: string[]
        twoFa_enabled: boolean
        twoFa_type: null
        updatedAt: Date
        __v: number
    }
    depotHasRated: boolean
    depotRating: null | string
    id: string
    jobListing: JobListing
    lastSeenLocationCoordinates: null
    opHasRated: boolean
    operative: {
        averageRating: number
        _id: string
        username: string
        firstName: string
        accountActivated: boolean
        accountType: string
        banned: boolean
        bio: string
        createdAt: Date
        email: string
        emailVerified: boolean
        gender: string
        lastName: string
        password: string
        profileImageUrl: string
        qualifiation: string
        resumeURL: string
        skillset: string[]
        twoFa_enabled: boolean
        twoFa_type: string
        updatedAt: Date
        __v: number
        
    }
    operativeRating: null
    shiftEnded: boolean
    shiftReminderSent: boolean
    updatedAt: Date
    __v: number
    _id: string
}
