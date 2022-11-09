import { JobListing } from "../../pages/Applications/interface"

export interface ShiftsTableInterface {
  status: "upcoming" | "active" | "completed"
  elements?:Result[]
}

export interface ShiftsDetailInterface {
  elements?:Result[]
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
            
 export interface Result {
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
            