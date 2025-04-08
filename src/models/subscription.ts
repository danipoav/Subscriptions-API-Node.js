export interface Subscription {
    id: number,
    renewal_date: Date,
    start_date: Date,
    plan_id: string,
    user_id: string
}