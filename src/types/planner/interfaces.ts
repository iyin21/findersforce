import { JobListing } from "../../pages/Applications/interface"

export interface ShiftsTableInterface {
    status: "upcoming" | "ongoing" | "completed" | "cancelled"
    elements?: Result[]
}

export interface ShiftsDetailInterface {
    elements?: Result[]
}

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

export interface ShiftByScheduleIdResponse {
    message: string
    status: string
    data: Result
}

export interface Result {
    cancelReason: string
    cancelReasonMoreDetails: string
    cancelStatus: boolean
    clockInLocationCoordinates: string
    clockInStatus: boolean
    clockInTime: Date
    cancelTime: Date
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
    depotCompany: {
        address: string
        createdAt: Date
        createdBy: Date
        depot: string
        id: string
        logo: string
        name: string
        regionLimit: number
        updatedAt: Date
        __v: number
        _id: string
    }
    depotHasRated: boolean
    depotRating: null | DepotRating
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
    operativeRatingSummary: {
        avgAverageScore: Number
        avgHelpfulnessScore: Number
        avgProfessionalismScore: Number
        avgPunctualityScore: Number
    }
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

export interface PaymentEvidenceUpload {
    status: string
    message: string
    data: {
        _id: string
        depot: string
        createdAt: string
        updatedAt: string
        __v: number
        schedule: string[]
        status: string
        rejectReason: string
        rejectedDate: Date
        acceptedDate: Date
        uploadDate: Date
    }
}

export interface RateOperativeRequest {
    operativeId: string
    scheduleId: string
    professionalismScore: number
    helpfulnessScore: number
    punctualityScore: number
    review?: string
}
export interface RateOperativeResponse {
    status: string
    message: string
    data: {
        rater: string
        operative: string
        schedule: string
        professionalismScore: number
        punctualityScore: number
        helpfulnessScore: number
        averageScore: number
        review: string
        _id: string
        createdAt: Date | string
        updatedAt: Date | string
        __v: 0
    }
}
