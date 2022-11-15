export interface JobBoardRequest {
    isPublished: boolean
    signal?: AbortSignal
}

export interface JobBoardResponse {
    count: number
    status: string
    pagination: {
        next: {}
        prev: {}
    }
    data: {
        data: JobBoardResponseInterface[]
    }
}

export interface JobBoardResponseInterface {
    _id: string
    title: string
    jobDate: string
    jobDescription: string
    status: string
    isPublished: boolean
    jobAccessibleTo: string
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
