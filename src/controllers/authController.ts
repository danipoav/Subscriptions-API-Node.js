import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import { AppDataSource } from "../database";
import bcrypt from 'bcryptjs';
import { User } from "../models/user";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ message: 'Invalid Email' });
            return;
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            res.status(401).json({ message: 'Invalid Password' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: `Email already in database ${email} ${req.body}` });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            email,
            name,
            password: hashedPassword,
            rol: 'USER'
        });

        await userRepository.save(newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

