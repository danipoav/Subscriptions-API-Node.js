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
exports.deletePlan = exports.getPlan = exports.getAllPlans = void 0;
const planService_1 = require("../services/planService");
const getAllPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield (0, planService_1.fetchAllPlans)();
    res.status(200).json(plans);
});
exports.getAllPlans = getAllPlans;
const getPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const plan = yield (0, planService_1.fetchPlanById)(id);
    if (!plan) {
        res.status(404).json({ message: 'Plan not founded' });
    }
    res.status(200).json(plan);
});
exports.getPlan = getPlan;
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield (0, planService_1.removePlan)(id);
    res.status(200).json(message);
});
exports.deletePlan = deletePlan;
