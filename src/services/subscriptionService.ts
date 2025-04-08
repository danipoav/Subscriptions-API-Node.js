import connection, { AppDataSource } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { Subscription, SubscriptionRequest } from '../models/subscription';

export const fetchSubsByUserId = async (id: string) => {
    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    const subscriptions = await subscriptionRepository.find({
        where: { user: { id: Number(id) } },
        relations: ['plan', 'user'],
    });

    return subscriptions;
}

export const removeSubsById = async (id: string) => {
    const subscriptionRepository = AppDataSource.getRepository(Subscription);
    await subscriptionRepository.delete(id);
    return 'Subscription deleted successfully';
}

export const createSubscription = async (request: SubscriptionRequest) => {
    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    const subscription = subscriptionRepository.create({
        renewal_date: new Date(request.renewal_date),
        start_date: new Date(request.start_date),
        plan: { id: Number(request.plan_id) },
        user: { id: Number(request.user_id) },
    });

    await subscriptionRepository.save(subscription);

    return 'Subscription created successfully';
}