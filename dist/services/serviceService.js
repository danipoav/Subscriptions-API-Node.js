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
exports.fetchAllServices = void 0;
const database_1 = require("../database");
const services_1 = require("../models/services");
const fetchAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRepository = database_1.AppDataSource.getRepository(services_1.Service);
    const services = yield serviceRepository.find();
    return services;
});
exports.fetchAllServices = fetchAllServices;
