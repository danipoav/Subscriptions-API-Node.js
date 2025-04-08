import { Request, Response } from 'express';
import { connectDB } from "./database";
import authRouter from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'


const express = require('express');
const app = express();

connectDB();

app.use(express.json());

//Ruta Autentificación para generar un token.
app.use('/api/auth', authRouter);

//Rutas Privadas, tener necesariamente un token valido.
app.use('/api', protectedRoutes);

app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to my subscriptions API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
