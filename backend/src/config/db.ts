import mysql from 'mysql2/promise'

// TODO change database?
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: 'main',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
