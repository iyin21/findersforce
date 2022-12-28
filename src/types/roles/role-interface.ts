export interface InviteUserInterface {
    email: string[]
    invitedRole: string
    regionAddress?: string | undefined
    companyId?: string | undefined
    companyName?: string | null
    phoneNumber?: string | null
    address?: string | null
    logo?: string | null
    jwt?: string
    subscription_plan?: string
    num_of_locations?: string
    trial_period?: boolean
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
        total: number
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
    depotCompany: {
        name: string
        completedShifts: number
        totalOperatives: number
        regionLimit: number
        address: string
    }
    depotRole: string
}
