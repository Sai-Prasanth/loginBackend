// import { pool } from '../db';

// export const addLoginAttempt = async (ip: string, email: string) => {
//   await pool.query(
//     'INSERT INTO login_attempts (ip_address, email) VALUES ($1, $2)',
//     [ip, email]
//   );
// };

// export const getRecentAttempts = async (ip: string, email: string): Promise<number> => {
//   const since = new Date(Date.now() - 15 * 60 * 1000); // last 15 min
//   const result = await pool.query(
//     `SELECT COUNT(*) FROM login_attempts 
//      WHERE (ip_address = $1 OR email = $2) AND attempt_time > $3`,
//     [ip, email, since]
//   );
//   return parseInt(result.rows[0].count);
// };

// export const resetAttempts = async (ip: string, email: string) => {
//   await pool.query(
//     'DELETE FROM login_attempts WHERE ip_address = $1 OR email = $2',
//     [ip, email]
//   );
// };
