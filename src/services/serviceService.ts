import connection from '../database';
import { Service } from '../models/services';

export const fetchAllServices = async () => {
    const [services]: any = await connection.query('SELECT * FROM services');
    return services;
}