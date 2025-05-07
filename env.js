import dotenv from 'dotenv';

dotenv.config();

const { PORT = 3333 } = process.env;

export { PORT };