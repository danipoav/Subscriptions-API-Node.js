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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("reflect-metadata");
const database_1 = require("./database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const express = require('express');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');
app.use(express.json());
//Restricciones de CORS para que solo permita solicitudes de mi dominio
app.use(cors({
    origin: 'http://subs-page.s3-website.eu-west-3.amazonaws.com/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
//Inicializar DataSource en cada peticion
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!database_1.AppDataSource.isInitialized) {
        try {
            yield database_1.AppDataSource.initialize();
            console.log('Database initialized ✅');
        }
        catch (error) {
            console.error('Database initialization error ❌', error);
            return res.status(500).json({ message: 'Database connection error', error });
        }
    }
    next();
}));
//Ruta Autentificación para generar un token.
app.use('/api/auth', authRoutes_1.default);
//Rutas Privadas, tener necesariamente un token valido.
app.use('/api', protectedRoutes_1.default);
app.use('/', (req, res) => {
    res.json({ message: 'Welcome to my subscriptions API' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
exports.handler = serverless(app, {
    request: (request, event) => {
        if (event.body && typeof event.body === 'string') {
            try {
                request.body = JSON.parse(event.body);
            }
            catch (err) {
                console.error('Error parsing body', err);
            }
        }
        return request;
    }
});
