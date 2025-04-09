"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionController = exports.deleteSubById = exports.getSubscriptionByUserId = void 0;
const subscriptionService_1 = require("../services/subscriptionService");
const getSubscriptionByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const subscription = yield (0, subscriptionService_1.fetchSubsByUserId)(id);
    if (!subscription) {
        res.status(404).json({ message: 'Subscription not founded' });
    }
    res.status(200).json(subscription);
});
exports.getSubscriptionByUserId = getSubscriptionByUserId;
const deleteSubById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield (0, subscriptionService_1.removeSubsById)(id);
    res.status(200).json(message);
});
exports.deleteSubById = deleteSubById;
const createSubscriptionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield (0, subscriptionService_1.createSubscription)(req.body);
    res.status(200).json(message);
});
exports.createSubscriptionController = createSubscriptionController;
