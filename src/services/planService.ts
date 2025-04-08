import connection, { AppDataSource } from '../database';
import { Plan } from '../models/plan';

export const fetchAllPlans = async () => {
    const planRepository = AppDataSource.getRepository(Plan);
    const plans = await planRepository.find({
        relations: ['service'],
    });
    return plans;
}

export const fetchPlanById = async (id: string) => {
    const planRepository = AppDataSource.getRepository(Plan);
    const plan = await planRepository.findOne({
        where: { id: Number(id) },
        relations: ['service'],
    });

    return plan;
}

export const removePlan = async (id: string) => {
    const planRepository = AppDataSource.getRepository(Plan);
    await planRepository.delete(id);
    return 'Plan deleted successfully';
}