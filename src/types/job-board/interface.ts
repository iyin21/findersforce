export interface JobBoardRequest {
    isPublished: boolean
    signal?: AbortSignal
    limit?: number
    page?: number
    meetingPoint: string
    // amount: string[]
    // perPage?: number
    // jobType: string
    // jobMode: string
    // jobRate?: string
}

export interface JobBoardResponse {
    count: number
    status: string
    pagination: {
        next: {
            page: number
            limit: number
        }
        prev: {
            page: number
            limit: number
        }
    }
    data: JobBoardResponseInterface[]
}

export interface JobBoardResponseInterface {
    _id: string
    title: string
    jobDate: string
    jobDescription: string
    status: string
    isPublished: boolean
    jobAccessibleTo: string
    createdAt: string
    jobLocation: {
        formattedAddress: string
        street: string
        city: string
        state: string
        country: string
    }
    jobRate: {
        currency: string
        jobRatePerHourDisplayedToDepot: number
        jobRatePerHourDisplayedToOp: number
    }
    jobType: {
        name: string
        id: string
    }
    jobQualification: {
        _id: string
        name: string
    }
    user: {
        _id: string
        firstName: string
        lastName: string
        averageRating: number
    }
    additionalInfoImageUrls: string[]
    numberOfOpsRequired: number
    shiftStartTime: string
    shiftDurationInHours: number
    applicationsCount: number
    shiftEndTime: string
    companyName: string
    jobMeetingPoint: string
    jobMatchPercentage: number
}

export interface JobBoardByIdResponse {
    _id: string
    name: string
}

export interface CreateJobListRequestInterface {
    jobTypeId: string
    jobAddress: string
    jobMeetingPoint: string
    jobDate: string
    shiftStartTime: string
    shiftDurationInHours: string
    jobQualificationId: string
    other_qualification: string
    numberOfOpsRequired: number
    hourly_pay: number
    jobDescription: string
    additionalInfoImageUrls: string
}

export interface JobInformationInterface {
    description: string | undefined
    location: string | undefined
    shiftMode: string | undefined
    date: string | undefined
    hourlyPay: number | undefined
    noOfOperativesRequired: number | undefined
    requiredQualification: string | undefined
    currency: string | undefined
    shiftStartTime: string | undefined
    shiftEndTime: string | undefined
    jobType: string | undefined
    createdAt: string | undefined
}

export interface BulkDeleteJobRequest {
    jobIds: string[]
}

export interface ISearchRequest {
    q?: string
    page?: number
    limit?: number
    signal?: AbortSignal
}

export interface ISearchResponse {
    currentPage: number
    nextPage: number
    prevPage: number
    totalRecords: number
    totalPages: number
    results: {
        _id: string
        firstName: string
        lastName: string
        averageRating: number
        profileImageUrl: string
    }[]
}
