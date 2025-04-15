import { Response, Request } from "express";
import { fetchSubsByUserId, removeSubsById, createSubscription, updateSubscriptionById } from "../services/subscriptionService";

export const getSubscriptionByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const subscription = await fetchSubsByUserId(id);
    if (!subscription) {
        res.status(404).json({ message: 'Subscription not founded' });
    }
    res.status(200).json(subscription);
}

export const deleteSubById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await removeSubsById(id);
    res.status(200).json(message);
}

export const createSubscriptionController = async (req: Request, res: Response) => {
    const message = await createSubscription(req.body);
    res.status(200).json(message);
}

export const updateSubs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = updateSubscriptionById(id, req.body);
    res.status(200).json(message);
}