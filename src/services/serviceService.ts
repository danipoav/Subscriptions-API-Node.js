import  { AppDataSource } from '../database';
import { Service } from '../models/services';

export const fetchAllServices = async () => {
    const serviceRepository = AppDataSource.getRepository(Service);
    const services = await serviceRepository.find();
    return services;
}