import { Router } from "express";
import { getSubscriptionByUserId, deleteSubById, createSubscriptionController, updateSubs } from "../controllers/subscriptionController";
import { authenticateToken } from "../middleware/auth";

const router = Router();
router.get('/:id', getSubscriptionByUserId);
router.use(authenticateToken)
router.delete('/:id', deleteSubById);
router.post('/', createSubscriptionController);
router.put('/:id', updateSubs);

export default router;