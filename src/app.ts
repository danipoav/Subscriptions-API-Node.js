import "reflect-metadata";
import { Request, Response } from 'express';
import { AppDataSource } from "./database";
import authRouter from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'

const express = require('express');
const app = express();
const cors = require('cors');
const serverless = require('serverless-http');

AppDataSource.initialize()
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
app.use('/api/auth', authRouter);

//Rutas Privadas, tener necesariamente un token valido.
app.use('/api', protectedRoutes);

app.use('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to my subscriptions API' });
});


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`)
// });

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
