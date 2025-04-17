"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubscriptionById = exports.createSubscription = exports.removeSubsById = exports.fetchSubsByUserId = void 0;
const database_1 = require("../database");
const plan_1 = require("../models/plan");
const subscription_1 = require("../models/subscription");
const fetchSubsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionRepository = database_1.AppDataSource.getRepository(subscription_1.Subscription);
    const subscriptions = yield subscriptionRepository.find({
        where: { user: { id: Number(id) } },
        relations: ['plan', 'plan.service', 'user'],
    });
    const now = new Date();
    for (const sub of subscriptions) {
        const renewalDate = new Date(sub.renewal_date);
        if (renewalDate.getTime() < now.getTime()) {
            console.log(`Eliminando suscripción expirada con ID: ${sub.id}`);
            yield subscriptionRepository.delete(sub.id);
        }
    }
    const activeSubscriptions = subscriptions.filter(sub => {
        const renewalDate = new Date(sub.renewal_date);
        return renewalDate.getTime() > now.getTime();
    });
    return activeSubscriptions;
});
exports.fetchSubsByUserId = fetchSubsByUserId;
const removeSubsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionRepository = database_1.AppDataSource.getRepository(subscription_1.Subscription);
    yield subscriptionRepository.delete(id);
    return 'Subscription deleted successfully';
});
exports.removeSubsById = removeSubsById;
const createSubscription = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionRepository = database_1.AppDataSource.getRepository(subscription_1.Subscription);
    const subscription = subscriptionRepository.create({
        renewal_date: new Date(request.renewal_date),
        start_date: new Date(request.start_date),
        plan: { id: Number(request.plan_id) },
        user: { id: Number(request.user_id) },
    });
    yield subscriptionRepository.save(subscription);
    return subscription;
});
exports.createSubscription = createSubscription;
const updateSubscriptionById = (id, request) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionRepository = database_1.AppDataSource.getRepository(subscription_1.Subscription);
    const planRepository = database_1.AppDataSource.getRepository(plan_1.Plan);
    const subscription = yield subscriptionRepository.findOne({
        where: { id: Number(id) },
        relations: ['plan', 'plan.service', 'user'],
    });
    if (!subscription)
        throw new Error('Subscription not found');
    const newPlan = yield planRepository.findOneBy({ id: Number(request.plan_id) });
    if (!newPlan)
        throw new Error('Plan not found');
    subscription.plan = newPlan;
    const now = new Date();
    subscription.renewal_date = newPlan.period === '1 año'
        ? new Date(now.setFullYear(now.getFullYear() + 1))
        : new Date(now.setMonth(now.getMonth() + 1));
    yield subscriptionRepository.save(subscription);
    return subscription;
});
exports.updateSubscriptionById = updateSubscriptionById;
