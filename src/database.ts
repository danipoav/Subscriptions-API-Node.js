import mysql from 'mysql2';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Plan } from './models/plan';
import { Service } from './models/services';
import { User } from './models/user';
import { Subscription } from './models/subscription';

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
    entities: [Plan, Service, User, Subscription],
});

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

export const connectDB = (): void => {
    connection.connect((error) => {
        if (error) {
            console.log('Error getting connection to DB: ', error);
            process.exit(1);
        } else {
            console.log('Connected correctly to MySQL')
        }
    })
}

export default connection.promise();
