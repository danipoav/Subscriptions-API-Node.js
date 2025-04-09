import { Router } from "express";
import { getAllPayments, getPayment, deletePaymentBySubId, createNewSubscription, updateSubscriptionUsingId } from "../controllers/paymentController";
import { authenticateToken } from "../middleware/auth";
const router = Router();

router.use(authenticateToken);
router.get('/', getAllPayments);
router.get('/:id', getPayment);
router.delete('/:id', deletePaymentBySubId);
router.post('/', createNewSubscription);
router.put('/:id', updateSubscriptionUsingId);

export default router;