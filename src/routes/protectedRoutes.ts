import { Router } from "express";
import planRoute from './planRoutes';
import subsRoute from './subscriptionRoutes';
import paymentRoute from './paymentRoutes';
import serviceRoute from './serviceRoutes';

const router = Router();

router.use('/plans', planRoute);
router.use('/subscriptions', subsRoute)
router.use('/payments', paymentRoute);
router.use('/services', serviceRoute);


export default router;