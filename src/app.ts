import "reflect-metadata";
import { Request, Response } from 'express';
import { AppDataSource } from "./database";
import authRouter from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'

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
app.use(async (req: any, res: any, next: any) => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database initialized ✅');
    } catch (error) {
      console.error('Database initialization error ❌', error);
      return res.status(500).json({ message: 'Database connection error', error });
    }
  }
  next();
});

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

export const handler = serverless(app, {
  request: (request: any, event: { body?: string }) => {
    if (event.body && typeof event.body === 'string') {
      try {
        request.body = JSON.parse(event.body);
      } catch (err) {
        console.error('Error parsing body', err);
      }
    }
    return request;
  }
});
