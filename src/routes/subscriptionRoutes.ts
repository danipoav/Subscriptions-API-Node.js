import { Router } from "express";
import { getSubscriptionByUserId, deleteSubById, createSubscriptionController } from "../controllers/subscriptionController";
import { authenticateToken } from "../middleware/auth";

const router = Router();
router.get('/:id', getSubscriptionByUserId);
router.use(authenticateToken)
router.delete('/:id', deleteSubById);
router.post('/', createSubscriptionController);

export default router;