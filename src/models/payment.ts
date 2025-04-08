export interface PaymentRequest {
    amount: number,
    payment_date: Date,
    state: 'Paid' | 'Pending',
    subscribe_id: number
}

export interface PaymentUpdate{
    payment_date: Date,
    state: 'Paid' | 'Pending',
    subscribe_id: number
}

export interface Payment extends PaymentRequest {
    id: string
}