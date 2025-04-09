"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Acces Denied, No token provided.' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, secretKey);
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
