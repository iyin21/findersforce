export interface InviteShiftMangerInterface {
    email: string[]
    invitedRole: string
    regionAddress: string | undefined
    companyId?: string | undefined
    companyName?: string | null
    jwt?: string
}

export interface RolesRequest {
    status: "accepted" | "pending" | "REGIONAL-MANAGER"
    depotRole?: string
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
    depotRegion: {
        address: string
        createdBy: {
            firstName: string
            lastName: string
            depotRole: string
        }
    }
}
