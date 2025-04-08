import { Request, Response } from "express";
import { fetchAllServices } from "../services/serviceService";

export const getAllServices = async (req: Request, res: Response) => {
    const services = await fetchAllServices();
    res.status(200).json(services);
}