import { AppDataSource } from '../database';
import { PaymentRequest, PaymentUpdate } from '../interface/paymentInterface';
import { Payment, } from '../models/payment';

export const fetchAllPayments = async () => {
    const paymentRepository = AppDataSource.getRepository(Payment);

    const payments = await paymentRepository.find({
        relations: ['subscription', 'subscription.plan', 'subscription.plan.service'],
    });

    return payments;
}

export const getPaymentBySubId = async (id: string) => {
    const paymentRepository = AppDataSource.getRepository(Payment);

    const payments = await paymentRepository.find({
        where: { subscription: { id: Number(id) } },
        relations: ['subscription', 'subscription.plan', 'subscription.plan.service'],
    });

    return payments;
}

export const removePaymentBySubId = async (id: string) => {
    const paymentRepository = AppDataSource.getRepository(Payment);

    await paymentRepository.delete({ subscription: { id: Number(id) } });

    return 'Payment deleted successfully';
}

export const createPayment = async (request: PaymentRequest) => {
    const paymentRepository = AppDataSource.getRepository(Payment);

    const payment = paymentRepository.create({
        payment_date: new Date(request.payment_date),
        state: request.state,
        subscription: { id: request.subscribe_id },
        amount: request.amount
    });

    await paymentRepository.save(payment);

    return 'Payment created correctly';
}

export const updateSubscription = async (id: string, request: PaymentUpdate) => {
    const paymentRepository = AppDataSource.getRepository(Payment);

    await paymentRepository.update(id, {
        payment_date: new Date(request.payment_date),
        state: request.state,
        subscription: { id: request.subscribe_id },
    });

    return 'Payment updated successfully';
}