import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import serviceRoute from './serviceRoutes'
import planRoute from './planRoutes';
import subsRoute from './subscriptionRoutes';
import paymentRoute from './paymentRoutes';

const router = Router();

router.use(authenticateToken);
router.use('/services', serviceRoute);
router.use('/plans', planRoute);
router.use('/subscriptions', subsRoute)
router.use('/payments', paymentRoute);

export default router;