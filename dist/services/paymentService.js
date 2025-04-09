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
exports.updateSubscription = exports.createPayment = exports.removePaymentBySubId = exports.getPaymentBySubId = exports.fetchAllPayments = void 0;
const database_1 = require("../database");
const payment_1 = require("../models/payment");
const fetchAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const paymentRepository = database_1.AppDataSource.getRepository(payment_1.Payment);
    const payments = yield paymentRepository.find({
        relations: ['subscription', 'subscription.plan', 'subscription.plan.service'],
    });
    return payments;
});
exports.fetchAllPayments = fetchAllPayments;
const getPaymentBySubId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentRepository = database_1.AppDataSource.getRepository(payment_1.Payment);
    const payments = yield paymentRepository.find({
        where: { subscription: { id: Number(id) } },
        relations: ['subscription', 'subscription.plan', 'subscription.plan.service'],
    });
    return payments;
});
exports.getPaymentBySubId = getPaymentBySubId;
const removePaymentBySubId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentRepository = database_1.AppDataSource.getRepository(payment_1.Payment);
    yield paymentRepository.delete({ subscription: { id: Number(id) } });
    return 'Payment deleted successfully';
});
exports.removePaymentBySubId = removePaymentBySubId;
const createPayment = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentRepository = database_1.AppDataSource.getRepository(payment_1.Payment);
    const payment = paymentRepository.create({
        payment_date: new Date(request.payment_date),
        state: request.state,
        subscription: { id: request.subscribe_id },
        amount: request.amount
    });
    yield paymentRepository.save(payment);
    return 'Payment created correctly';
});
exports.createPayment = createPayment;
const updateSubscription = (id, request) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentRepository = database_1.AppDataSource.getRepository(payment_1.Payment);
    yield paymentRepository.update(id, {
        payment_date: new Date(request.payment_date),
        state: request.state,
        subscription: { id: request.subscribe_id },
    });
    return 'Payment updated successfully';
});
exports.updateSubscription = updateSubscription;
