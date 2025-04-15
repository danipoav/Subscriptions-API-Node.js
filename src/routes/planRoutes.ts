import { Router } from "express";
import { deletePlan, getAllPlans, getPlan, updatePlanById } from "../controllers/planController";
import { authenticateToken } from "../middleware/auth";

const router = Router();
router.get('/', getAllPlans);
router.use(authenticateToken);
router.get('/:id', getPlan)
router.put('/:id', updatePlanById);
router.delete('/:id', deletePlan);

export default router;