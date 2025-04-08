import connection from '../database';
import { PaymentRequest, PaymentUpdate } from '../models/payment';
import { v4 as uuidv4 } from 'uuid';

export const fetchAllPayments = async () => {
    const [rows] = await connection.query('SELECT * FROM payments');
    return rows;
}

export const getPaymentBySubId = async (id: string) => {
    const [rows] = await connection.query('SELECT * FROM payments WHERE subscribe_id = ?', [id])
    return rows;
}

export const removePaymentBySubId = async (id: string) => {
    await connection.query('DELETE * FROM payments WHERE subscribe_id = ?', [id]);
    return 'Payment deleted successfully';
}

export const createPayment = async (request: PaymentRequest) => {
    const id = uuidv4();
    const { amount, payment_date, state, subscribe_id } = request;
    await connection.query('INSERT INTO payments (id,amount,payment_date,state,subscribe_id) VALUES (?,?,?,?,?)',
        [id, amount, payment_date, state, subscribe_id]
    );
    return 'Payment created correctly';
}

export const updateSubscription = async (id: string, request: PaymentUpdate) => {
    const { payment_date, state, subscribe_id } = request;
    await connection.query('UPDATE payments SET payment_date = ?, state = ?, subscribe_id = ? WHERE id = ?',
        [payment_date, state, subscribe_id, id]
    );
    return 'Payment updated successfully';
}