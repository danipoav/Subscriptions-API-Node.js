import { AppDataSource } from '../database';
import { Plan } from '../models/plan';
import { Subscription, SubscriptionRequest, SubscriptionUpdate } from '../models/subscription';

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

export const updateSubscriptionById = async (id: string, request: SubscriptionUpdate) => {
    const subscriptionRepository = AppDataSource.getRepository(Subscription);
    const planRepository = AppDataSource.getRepository(Plan);

    const subscription = await subscriptionRepository.findOne({
        where: { id: Number(id) },
        relations: ['plan'],
    });

    if (!subscription) throw new Error('Subscription not found');

    const newPlan = await planRepository.findOneBy({ id: Number(request.plan_id) });
    if (!newPlan) throw new Error('Plan not found');

    subscription.plan = newPlan;

    const now = new Date();
    subscription.renewal_date = newPlan.period === '1 año'
        ? new Date(now.setFullYear(now.getFullYear() + 1))
        : new Date(now.setMonth(now.getMonth() + 1));

    await subscriptionRepository.save(subscription);

    return 'Subscription updated successfully';
}