import { Response, Request } from "express";
import { fetchAllPlans, fetchPlanById, removePlan, updatePlan } from "../services/planService";

export const getAllPlans = async (req: Request, res: Response) => {
    const plans = await fetchAllPlans();
    res.status(200).json(plans);
}

export const getPlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    const plan = await fetchPlanById(id);
    if (!plan) {
        res.status(404).json({ message: 'Plan not founded' })
    }
    res.status(200).json(plan);
}

export const deletePlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await removePlan(id);
    res.status(200).json(message);
}

export const updatePlanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = updatePlan(id, req.body);
    res.status(200).json(response);
}