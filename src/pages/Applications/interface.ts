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
    __v: number
    completedShfts: number
    certificates: Certificates[]
    jobMatchPercentage: number
    operativeRatingSummary: {
        avgAverageScore: Number
        avgHelpfulnessScore: Number
        avgProfessionalismScore: Number
        avgPunctualityScore: Number
    }
}
export interface Certificates {
    _id: string
    user: string
    name: string
    status: string
    issuingOrganisation: string
    credentialId: string
    dateIssued: Date
    createdAt: Date
    updatedAt: Date
    __v: number
    deleted: boolean
}
export interface JobListing {
    _id: string
    companyName: string
    jobType: Job
    depot: User
    jobDate: Date
    shiftStartTime: any
    shiftEndTime: any
    amountPaidByDepot: number
    amountPaidToOperative: number
    shiftDurationInHours: number
    jobMeetingPoint: string
    jobAccessibleTo: string
    operativeIds: string[]
    numberOfOpsRequired: number
    applicationsCount: number
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
    listingId: string
    fullyPaidByAdmin: boolean
    fullyPaidByDepot: boolean
}

export interface User {
    _id: string
    username: string
    firstName: string
    lastName: string
    gender: string
    email: string
    averageRating: number
    resumeUrl: string
    bio: string
    profileImageUrl: string
    createdAt: Date
    completedShifts: number
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
    jobRateDepotFirstDisplayedToDepot: number
    jobRateDepotFirstDisplayedToOp: number
    jobRateMeetOnsiteDisplayedToDepot: number
    jobRateMeetOnsiteDisplayedToOp: number
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
    jobMatchPercentage: string
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
    depotRating: DepotRating
    id: string
    jobListing: JobListing
    lastSeenLocationCoordinates: null
    opHasRated: boolean
    operative: {
        completedShifts: number
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

interface DepotRating {
    averageScore: number
    createdAt: Date
    depot: string
    helpfulnessScore: number
    organizationScore: number
    professionalismScore: number
    rater: string
    schedule: string
    updatedAt: Date
    __v: number
    _id: string
}
