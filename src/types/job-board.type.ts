export type ApplicationJobInterface = {
    elements: {
        id: string
        name: string
        qualification: string
        match: string
        rating: string
        date_applied: string
        time_applied: string
        status: string
    }[]
}

export type JobBoardInterface = {
    status: "active" | "draft"
    elements: {
        id: string
        type: string
        location: string
        date: string
        hourly_rate: string
        duration: string
        applicants: string
        mode: string
    }[]
}
