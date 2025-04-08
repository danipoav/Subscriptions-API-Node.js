export interface Plan {
    id: number,
    name: string,
    period: '1 mes' | '1 año',
    price: number,
    service_id: number
}