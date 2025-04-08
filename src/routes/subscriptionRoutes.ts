import { Router } from "express";
import { getSubscriptionByUserId, deleteSubById, createSubscriptionController } from "../controllers/subscriptionController";

const router = Router();

router.get('/:id', getSubscriptionByUserId);
router.delete('/:id', deleteSubById);
router.post('/', createSubscriptionController);

export default router;