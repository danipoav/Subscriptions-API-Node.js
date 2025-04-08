import { Response, Request } from "express";
import { fetchAllPayments, getPaymentBySubId, createPayment, updateSubscription, removePaymentBySubId } from "../services/paymentService";

export const getAllPayments = async (req: Request, res: Response) => {
    const payments = await fetchAllPayments();
    res.status(200).json(payments);
}

export const getPayment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payment = await getPaymentBySubId(id);
    if (!payment) {
        res.status(404).json({ message: 'Subscription not founded' });
    }
    res.status(200).json(payment);
}

export const deletePaymentBySubId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await removePaymentBySubId(id);
    res.status(200).json(message);
}

export const createNewSubscription = async (req: Request, res: Response) => {
    const response = await createPayment(req.body);
    res.status(200).json(response);
}

export const updateSubscriptionUsingId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await updateSubscription(id, req.body);
    res.status(200).json(response);
}