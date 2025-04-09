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
exports.updateSubscriptionUsingId = exports.createNewSubscription = exports.deletePaymentBySubId = exports.getPayment = exports.getAllPayments = void 0;
const paymentService_1 = require("../services/paymentService");
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield (0, paymentService_1.fetchAllPayments)();
    res.status(200).json(payments);
});
exports.getAllPayments = getAllPayments;
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield (0, paymentService_1.getPaymentBySubId)(id);
    if (!payment) {
        res.status(404).json({ message: 'Subscription not founded' });
    }
    res.status(200).json(payment);
});
exports.getPayment = getPayment;
const deletePaymentBySubId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield (0, paymentService_1.removePaymentBySubId)(id);
    res.status(200).json(message);
});
exports.deletePaymentBySubId = deletePaymentBySubId;
const createNewSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, paymentService_1.createPayment)(req.body);
    res.status(200).json(response);
});
exports.createNewSubscription = createNewSubscription;
const updateSubscriptionUsingId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield (0, paymentService_1.updateSubscription)(id, req.body);
    res.status(200).json(response);
});
exports.updateSubscriptionUsingId = updateSubscriptionUsingId;
