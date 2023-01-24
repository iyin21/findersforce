export interface NotificationResponse {
    count: number
    status: boolean
    pagination: {
        next: {}
        prev: {}
    }
    data: {
        data: NotificationData[]
    }
}

export interface NotificationData {
    _id: string
    sender: string | any
    description: string
    receiver: {
        _id: string
        email: string
        firstName: string
        lastName: string
        userName: string
        phoneNumber: string
    }
    title: string
    event: string
    createdAt: Date | string
    updatedAt: Date | string
    __v: number
    readStatus: boolean
    eventId: {
        user: {
            profileImageUrl: string | null
        }
    }
}
