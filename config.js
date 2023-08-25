import dotenv from 'dotenv';
dotenv.config();

export const config={
    user_db:process.env.DB_USER,
    password_db:process.env.DB_PASSWORD
}