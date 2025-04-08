import connection from '../database';

export const fetchSubsByUserId = async (id: string) => {
    const [rows]: any = connection.query('SELECT * FROM subscriptions WHERE user_id = ?', [id]);
    return rows;
}

export const removeSubsById = async (id:string) => {

}