export interface SubscriptionRequest {
    renewal_date: Date,
    start_date: Date,
    plan_id: string,
    user_id: string
}

export interface Subscription extends SubscriptionRequest {
    id: number
}