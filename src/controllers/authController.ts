import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import connection from "../database";
import bcrypt from 'bcryptjs';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [rows]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            res.status(401).json({ message: 'Invalid Email' });
        }

        const user = rows[0];

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            res.status(401).json({ message: 'Invalid Password' });
        }


        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}
