import dotenv from 'dotenv';
dotenv.config();

export const { MONGODB_URI, SECRET_KEY } = process.env;
