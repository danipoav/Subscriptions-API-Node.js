"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planController_1 = require("../controllers/planController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', planController_1.getAllPlans);
router.use(auth_1.authenticateToken);
router.get('/:id', planController_1.getPlan);
router.put('/:id', planController_1.updatePlanById);
router.delete('/:id', planController_1.deletePlan);
exports.default = router;
