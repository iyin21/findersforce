export interface ShiftsTableInterface {
                status: "upcoming" | "active" | "completed"
                elements: {
                    id: string
                    name: string
                    job_type: string
                    location: string
                    date: string
                    hourly_rate: string
                    duration: string
                    mode: string
                    schedule: string
                    ends_in: string
                    active: string
                    rating: string
                }[]
              }

export interface ShiftsDetailInterface {
                elements: {
                    id: string
                    name: string
                    time_in: string
                    time_out: string
                    amount: string
                    duration: string
                    rating: string
                    status: string
                    more: string
                }[]
              }