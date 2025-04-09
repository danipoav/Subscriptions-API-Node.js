"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planRoutes_1 = __importDefault(require("./planRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./subscriptionRoutes"));
const paymentRoutes_1 = __importDefault(require("./paymentRoutes"));
const serviceRoutes_1 = __importDefault(require("./serviceRoutes"));
const router = (0, express_1.Router)();
router.use('/plans', planRoutes_1.default);
router.use('/subscriptions', subscriptionRoutes_1.default);
router.use('/payments', paymentRoutes_1.default);
router.use('/services', serviceRoutes_1.default);
exports.default = router;
