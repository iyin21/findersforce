export interface SubscriptionTableInterface {
                elements?:Result[]
} 

export interface Result {
                amount: number
                contactPerson: string
                paymentReference: string
                monthPaid: string
}