export interface IDepotRating {
    status: string
    message: string
    data: IDepotRatingData
}

export interface IDepotRatingData {
    avgProfessionalismScore: number
    avgOrganizationScore: number
    avgHelpfulnessScore: number
    avgAverageScore: number
}

export type ShiftCardProps = {
    status: "upcoming" | "ongoing" | "completed"
    profileImage: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    calenderIcon: string | undefined
    date: string | undefined
    clockIcon: string | undefined
    startTime: string | undefined
    endTime: string | undefined
    duration: number | string | undefined
    locationIcon: string | undefined
    location: string | undefined
    taskIcon: string | undefined
    task: string | undefined
    initialDate?: any
    messageIcon: string | undefined
}

export type CardProps = {
    title: string
    desc: string
    amount: number | undefined
    icon: string
    subtitle: string | undefined
    onClick: any
}

export interface DashboardResponse {
    status: string
    message: string
    data: DashboardData
}
export interface DashboardData {
    amountPaid: amountPaid
    hoursCompleted: hoursCompleted
    operativesHired: operativesHired
    shiftsCompleted: shiftsCompleted
    shiftsCancelled: shiftsCancelled
    genderDistribution: genderDistribution
    rating: rating
    shiftsCompletedPerDayOfMonth: shiftsCompletedPerDayOfMonth[]
    jobTypeDistribution: jobTypeDistribution[]
}

export interface shiftsCompletedPerDayOfMonth {
    dayOfMonth: string
    count: string
    date: Date
}

export interface jobTypeDistribution {
    jobType: string
    count: number
}
export interface rating {
    averageScore: number | undefined
    helpfulnessScore: number | undefined
    organizationScore: number | undefined
    professionalismScore: number | undefined
    totalShiftsRated: number | undefined
}
export interface amountPaid {
    total: number
    thisMonth: string
}
export interface hoursCompleted {
    total: number
    thisMonth: string
}
export interface operativesHired {
    total: number
    thisMonth: string
}
export interface shiftsCompleted {
    total: number
    thisMonth: string
}
export interface shiftsCancelled {
    total: number
    thisMonth: number
}
export interface genderDistribution {
    percentageMale: number
    percentageFemale: number
    percentageRatherNotSay: number
}

export interface RegionsResponse {
    status: string
    message: string
    data: Regions[]
    pagination: {
        nextPage: null
        prevPage: null
        totalRecords: number
        totalPages: number
    }
}

export interface Regions {
    _id: string
    depotCompany: string
    address: string
    createdBy: string
    createdAt: string
    updatedAt: string
    location: Location
    subscriptionPlan: string
    averageRating: number
    shiftManagerCount: number
    regionalManagerCount: number
    isTrial: boolean
    regionalManagers: any[]
    subscriptionPlanStatus: string
    __v: number
    lastSubscription: LastSubscription
}

interface LastSubscription {
    createdAt: string
    createdBy: string
    depotCompany: string
    depotRegion: string
    endDate: string
    paymentDate: string
    paymentInvoice: string
    paymentMethod: string
    space: number
    startDate: string
    subscriptionPlan: string
    totalAmountPaid: number
    updatedAt: string
    __v: number
    _id: string
}

export interface Location {
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
