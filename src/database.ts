import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from "./models/user";
import { Service } from "./models/services";
import { Plan } from "./models/plan";
import { Subscription } from "./models/subscription";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Service, Plan, Subscription]
});


