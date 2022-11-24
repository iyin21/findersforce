export interface InviteShiftMangerInterface {
    email: string[]
    invitedRole: string
    regionAddress: string | undefined
    companyId?: string | undefined
    companyName?: string | null
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
    depot: string
    lastName: string
    email: string
    address: string
    regionAddress: string
    phoneNumber: string
    invitedRole: string
    inviterRole: string
    status: string
    createdAt: string
    expired: boolean
}
