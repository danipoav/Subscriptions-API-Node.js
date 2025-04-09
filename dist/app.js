"use strict";
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
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected 🚀');
})
    .catch((error) => console.error('Error connecting to database', error));
app.use(express.json());
//Restricciones de CORS para que solo permita solicitudes de mi dominio
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
//Ruta Autentificación para generar un token.
app.use('/api/auth', authRoutes_1.default);
//Rutas Privadas, tener necesariamente un token valido.
app.use('/api', protectedRoutes_1.default);
app.use('/', (req, res) => {
    res.json({ message: 'Welcome to my subscriptions API' });
});
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`)
// });
exports.handler = serverless(app);
