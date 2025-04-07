export interface User {
    id: number,
    email: string,
    name: string,
    rol: 'ADMIN' | 'USER'
}