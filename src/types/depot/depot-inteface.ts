export interface DepotSingleTableInterface {
    elements: {
        _id: string
        mode: string
        location: string
        date: string
        hired: string
        applied: string
        completed: string
        cancelled: string
        managers: string
        ratings: string
        role: string
        phone_number: string
        shift_joined: string
        qualification: string
        name: string
        shift_id: string
        depot: string
        month: string
        rating: string
        email: string
        subscription: string
        mos_depots_pays: string
        mos_op_receives: string
        dpf_depots_pays: string
        dpf_op_receives: string
        registered_by: string
    }[]
}

export interface MultipleRateRequest {
    companyId: string | undefined
    jobRates: {
        jobQualificationId: string
        jobRateDepotFirstDisplayedToDepot: string
        jobRateDepotFirstDisplayedToOp: string
        jobRateMeetOnsiteDisplayedToDepot: string
        jobRateMeetOnsiteDisplayedToOp: string
    }[]
}

export interface InviteDepotInterfaceResponse {
    message: string
    companyId: string
}

export interface InviteDepotInterfaceRequest {
    email: string[]
    invitedRole: string
    regionAddress?: string | undefined
    companyId?: string | undefined
    companyName?: string | null
    phoneNumber?: string | null
    address?: string | null
    logo?: string | null
    regionLimit?: string
    companyEmail?: string
}
;[]

export interface JobRateResponse {
    pagination: {
        next: {}
        prev: {}
        total: number
    }
    data: IJobRateResponse[]
    count: number
}

export interface IJobRateResponse {
    message: string
    _id: string
    jobQualification: string
    jobRateDepotFirstDisplayedToDepot: number
    jobRateDepotFirstDisplayedToOp: number
    jobRateMeetOnsiteDisplayedToDepot: number
    jobRateMeetOnsiteDisplayedToOp: number
    currency: string
    depot: {
        _id: string
        username: string
        firstName: string
        lastName: string
        email: string
        accountType: string
    }
    company: {
        name: string
        createdAt: Date
    }
    __v: string
}
export interface ISingleJobRateResponse {
    _id: string
    jobQualification: {
        name: string
        createdAt: Date
    }
    jobRateDepotFirstDisplayedToDepot: number
    jobRateDepotFirstDisplayedToOp: number
    jobRateMeetOnsiteDisplayedToDepot: number
    jobRateMeetOnsiteDisplayedToOp: number
    currency: string
    depot: {
        _id: string
        username: string
        firstName: string
        lastName: string
        email: string
        accountType: string
    }
    company: {
        name: string
        createdAt: Date
    }
    __v: string
}

export interface JobRateRequest {
    company?: string
    id?: string
}
export interface UpdateJobRateRequest {
    // id: string
    jobRateDepotFirstDisplayedToDepot: number
    jobRateDepotFirstDisplayedToOp: number
    jobRateMeetOnsiteDisplayedToDepot: number
    jobRateMeetOnsiteDisplayedToOp: number
}
export interface CreateJobRateRequest {
    // depotId: string | undefined
    companyId: string | undefined
    jobRateDepotFirstDisplayedToDepot: string
    jobRateDepotFirstDisplayedToOp: string
    jobRateMeetOnsiteDisplayedToDepot: string
    jobRateMeetOnsiteDisplayedToOp: string
    jobQualificationId: string
}
export interface ScheduleRequest {
    companyId?: string
}

export interface ScheduleResponse {
    currentPage: number
    nextPage: null
    prevPage: null
    totalRecords: number
    totalPages: number
    results: IScheduleResponse[]
}

export interface IScheduleResponse {
    _id: string
    jobListing: {
        listingId: string
        _id: string
    }
    jobMeetingPoint: string
    jobLocation: {
        formattedAddress: string
    }
    createdAt: Date
    completedShifts: number
    cancelledShifts: number
    appliedShifts: number
    hiredShifts: number
}

export interface OperativeRequest {
    companyId?: string | undefined
    regionId?: string | undefined
}

export interface OperativeResponse {
    currentPage: number
    nextPage: null
    prevPage: null
    totalRecords: number
    totalPages: number
    results: IOperativeResponse[]
}

export interface IOperativeResponse {
    _id: string
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    averageRating: number
    completedShifts: number
    phone_number: string
    qualification: {
        _id: string
        name: string
        jobQualificationCategoryId: string
        description: string
        createdAt: Date
        updatedAt: Date
        __v: number
    }[]
}

export interface PaymentResponse {
    currentPage: number
    nextPage: null
    prevPage: null
    totalRecords: number
    totalPages: number
    results: IPaymentResponse[]
}

export interface IPaymentResponse {
    schedule: {
        jobLocation: {
            formattedAddress: string
            street: string
            city: string
        }
        additionalInfoImageUrls: string[]
    }
    depot: {
        email: string
    }

    fullyPaidByDepot: boolean
    fullyPaidByAdmin: boolean
    createdAt: Date
}

export interface deleteRequest {
    regionIds: string[]
}
