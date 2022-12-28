import { JobListing } from "../../pages/Applications/interface"

export interface PaymentResponse {
    message: string
    status: string
    data: {
        currentPage: number
        nextPage: null
        prevPage: null
        totalRecords: number
        totalPages: number
        results: Result[]
    }
}

export interface Result {
    _id: string
    depot: Depot
    operative: Operative
    schedule: Schedule
    jobListing: string
    referenceNo: string
    status: string
    adminStatus: string
    adminPaymentDate: null
    adminConfirmedDate: null
    description: string
    paymentEvidenceUploadDate: null | Date
    confirmedDate: null | Date
    createdAt: Date
    updatedAt: Date
    __v: number
    depotCompany: string
    depotRegion: {
        address: string
        averageRating: number
        courseLink: string
    }
}

interface Operative {
    _id: string
    firstName: string
    lastName: string
    id: string
}

interface Depot {
    _id: string
    firstName: string
    lastName: string
    companyName: string
    depotCompany: {
        regionLimit: 1
        _id: string
        depot: string
        name: string
        address: string
        createdBy: Date
        createdAt: Date
        updatedAt: Date
        __v: number
        id: string
    },
    id: string
}

interface Schedule {
    _id: string
    depot: string
    depotRegion: string
    depotCompany: string
    operative: string
    jobListing: JobListing
    cancelReason: string
    cancelReasonMoreDetails: string
    cancelStatus: boolean
    clockInLocationCoordinates: null | any
    clockInStatus: boolean
    clockInTime: Date
    cancelTime: Date
    clockOutLocationCoordinates: null | any
    clockOutStatus: boolean
    clockOutTime: null | Date
    createdAt: Date
    lastSeenLocationCoordinates: null 
    shiftEnded: boolean
    opHasRated: boolean
    depotHasRated: boolean
    shiftReminderSent: boolean
    transactionCreated: boolean
    updatedAt: Date
    __v: number
    id: string
}

  export interface TransactionResponse {
    data: {
        status: string
        message: string
        data: null
    }
  }