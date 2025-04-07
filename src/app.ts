import { Request, Response } from 'express';
import { connectDB } from "./database";


const express = require('express');
const app = express();

connectDB();

app.use(express.json());

app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to my subscriptions API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
