import connection from '../database';

export const fetchAllPlans = async () => {
    const [rows]: any = await connection.query('SELECT * FROM plans');
    return rows;
}

export const fetchPlanById = async (id: string) => {
    const [rows]: any = await connection.query('SELECT * FROM plans WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
}

export const removePlan = async (id: string) => {
    await connection.query('DELETE FROM plans WHERE id = ?', [id]);
    return 'Plan deleted successfully';
}