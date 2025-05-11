import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user.model.js';

dotenv.config();

const { PORT = 3333, NODE_ENV = 'dev' } = process.env;

const USERS = [
  new User({
    id: '63e29366-bdee-40d7-a363-abb8a01f8f0e',
    username: 'John Doe',
    age: 30,
    hobbies: ['reading', 'gaming'],
  }),
  new User({
    id: '3c37ed1b-684f-440a-8b0b-8c12be6cafe9',
    username: 'Jane Smith',
    age: 25,
    hobbies: ['cooking', 'traveling'],
  }),
  new User({
    id: uuidv4(),
    username: 'Alice Johnson',
    age: 28,
    hobbies: ['painting', 'hiking'],
  }),
];

export { PORT, USERS, NODE_ENV };