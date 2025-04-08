import { Router } from "express";
import { getAllPayments, getPayment, deletePaymentBySubId, createNewSubscription, updateSubscriptionUsingId } from "../controllers/paymentController";
const router = Router();

router.get('/', getAllPayments);
router.get('/:id', getPayment);
router.delete('/:id', deletePaymentBySubId);
router.post('/', createNewSubscription);
router.put('/:id', updateSubscriptionUsingId);

export default router;