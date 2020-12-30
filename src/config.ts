import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'mern-avtek',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    PORT: process.env.PORT || 3000,
}