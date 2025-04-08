import { Router } from "express";
import { deletePlan, getAllPlans, getPlan } from "../controllers/planController";

const router = Router();

router.get('/', getAllPlans);
router.get('/:id', getPlan)
router.delete('/:id', deletePlan);

export default router;