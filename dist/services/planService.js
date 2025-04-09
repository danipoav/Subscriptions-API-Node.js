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
exports.removePlan = exports.fetchPlanById = exports.fetchAllPlans = void 0;
const database_1 = require("../database");
const plan_1 = require("../models/plan");
const fetchAllPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    const planRepository = database_1.AppDataSource.getRepository(plan_1.Plan);
    const plans = yield planRepository.find({
        relations: ['service'],
    });
    return plans;
});
exports.fetchAllPlans = fetchAllPlans;
const fetchPlanById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const planRepository = database_1.AppDataSource.getRepository(plan_1.Plan);
    const plan = yield planRepository.findOne({
        where: { id: Number(id) },
        relations: ['service'],
    });
    return plan;
});
exports.fetchPlanById = fetchPlanById;
const removePlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const planRepository = database_1.AppDataSource.getRepository(plan_1.Plan);
    yield planRepository.delete(id);
    return 'Plan deleted successfully';
});
exports.removePlan = removePlan;
