import connection from '../database';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionRequest } from '../models/subscription';

export const fetchSubsByUserId = async (id: string) => {
    const [rows]: any = await connection.query('SELECT * FROM subscriptions WHERE user_id = ?', [id]);
    return rows;
}

export const removeSubsById = async (id: string) => {
    await connection.query('DELETE * FROM subscriptions WHERE id = ?', [id]);
    return 'Subscription deleted successfully';
}

export const createSubscription = async (request: SubscriptionRequest) => {
    const id = uuidv4();
    const { renewal_date, start_date, plan_id, user_id } = request;
    await connection.query('INSERT INTO subscriptions (id,renewal_date,start_date,plan_id,user_id) VALUES (?,?,?,?,?)',
        [id, renewal_date, start_date, plan_id, user_id]
    );
    return 'Subscription created successfully';
}