export interface SubscriptionTableInterface {
    status?: "Entry" | "Pro" | "Enterprise" | "Elite"
    elements?: Result[]
}


export interface SubscriptionResponse {
    message: string
    status: string
    data: {
        currentPage: number
        nextPage: null
        prevPage: null
        totalRecords: number
        totalPages: number

        results: Result[]
    }
}

export interface Result {
    _id: any
    __v: number
    depotCompany: {
        regionLimit: number
        _id: string
        depot: string
        name: string
        address: string
        createdBy: {
            _id: string
            firstName: string
            lastName: string
            email: string
            id: string
        }
        createdAt: Date | string
        updatedAt: Date | string
        __v: number
        id: string
    }
    depotRegion: string
    subscriptionPlan: string
    space: number
    totalAmountPaid: number
    paymentMethod: string
    startDate: Date | string
    endDate: Date | string
    paymentDate: Date | string
    paymentInvoice: string
    createdBy: string
    createdAt: Date | string
    updatedAt: Date | string
}

export interface DepotCompanyResponse {
    message: string
    status: string
    data: [
        {_id: string
            depot: string
            name: string
            address: string
            logo: string
            regionLimit: number
            email: string
            createdAt:Date | string
            updatedAt: Date | string
            createdBy: string
            __v: number}
    ]
}

export interface SubscriptionPrice {
    message: string
    status: string
    data: {
        subscriptionPrice: {
            entry: number
            elite: number
            pro: number
            enterprise: number
        }
    }
    
}