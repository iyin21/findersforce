export interface FilterRequest {
    meetingPoint: string
    jobMeetingPoint?: string
    // jobMode: string[]
    // amount: string[]
}

export interface ApplicationFilterRequest {
    jobTypeId?: string
    jobMatchPercentageMin?: string
    jobMatchPercentageMax?: string
    jobMeetingPoint?: string
}