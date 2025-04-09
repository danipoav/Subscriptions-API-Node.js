import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Plan } from './models/plan';
import { Service } from './models/services';
import { User } from './models/user';
import { Subscription } from './models/subscription';
import { Payment } from './models/payment';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: process.env.NODE_ENV === "production"
        ? ["dist/models/**/*.js"] 
        : ["src/models/**/*.ts"],
});


