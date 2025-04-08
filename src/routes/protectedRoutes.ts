import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import serviceRoute from './serviceRoutes'
import planRoute from './planRoutes';

const router = Router();

router.use(authenticateToken);
router.use('/services', serviceRoute);
router.use('/plans', planRoute);

export default router;