export interface InviteShiftMangerInterface {
    email: string[]
    invitedRole: string
}

export interface RolesRequest {
    status: "accepted" | "pending"
    signal?: AbortSignal
    limit?: number
    page?: number
}

export interface RoleResponse {
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
    data: IRolesResponse[]
}

export interface IRolesResponse {
    _id: string
    firstName: string
    lastName: string
    email: string
    address: string
    phoneNumber: string
    invitedRole: string
    inviterRole: string
    status: string
    createdAt: string
    expired: boolean
}
