import { v4 as uuidv4 } from 'uuid';
import { User, userScheme } from '../models/user.model.js';
import { isValide } from '../utils/validator.js';
import { NotFoundError, ValidationError } from '../utils/error.handler.js';

const users = [
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

export const getUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (userId, res) => {
  try {
    console.log(userId);
    const user = users.find((user) => user.id === userId);
    console.log(user);
    if (!user) throw new NotFoundError(`User with id ${id} not found`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    console.log(error)
    return ErrorHandler(error, req, res);
  }
};

export const createUser = (req, res) => {
  try {
    const { username, age, hobbies } = req.body;

    if (!isValide({ username, age, hobbies }, userScheme)) {
      throw new ValidationError('Invalid user data');
    }

    const user = new User({
      id: uuidv4(),
      username,
      age,
      hobbies,
    });

    users.push(user);

    res.status(201).json(user);
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};

export const editUsersById = (req, res) => {
  try {
    const { id } = req.params;
    const { username, age, hobbies } = req.body;

    if (!isValide({ username, age, hobbies }, userScheme)) {
      throw new ValidationError('Invalid user data');
    }

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    const user = new User({
      id,
      username,
      age,
      hobbies,
    });
    users[userIndex] = user;
    res.status(200).json(user);
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};

export const deleteUserById = (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    users.splice(userIndex, 1);
    res.status(204).send();
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};
