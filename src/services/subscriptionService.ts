import { AppDataSource } from '../database';
import { Subscription, SubscriptionRequest } from '../models/subscription';

export const fetchSubsByUserId = async (id: string) => {
    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    const subscriptions = await subscriptionRepository.find({
        where: { user: { id: Number(id) } },
        relations: ['plan', 'plan.service', 'user'],
    });

    const now = new Date();

    for (const sub of subscriptions) {
        const renewalDate = new Date(sub.renewal_date);

        if (renewalDate.getTime() < now.getTime()) {
            console.log(`Eliminando suscripción expirada con ID: ${sub.id}`);
            await subscriptionRepository.delete(sub.id);
        }
    }

    const activeSubscriptions = subscriptions.filter(sub => {
        const renewalDate = new Date(sub.renewal_date);
        return renewalDate.getTime() > now.getTime();
    });

    return activeSubscriptions;
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

    return subscription;
}