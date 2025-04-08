import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import serviceRoute from './serviceRoutes'

const router = Router();

router.use(authenticateToken);
router.use('/services', serviceRoute);

export default router;