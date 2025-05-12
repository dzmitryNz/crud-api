import { v4 as uuidv4 } from 'uuid';

import { User, userScheme } from '../models/user.model.js';
import { isValide } from '../utils/validator.js';
import { ErrorHandler, NotFoundError, ValidationError } from '../utils/error.handler.js';
import { USERS, NODE_ENV } from '../env.js';

const isDEV = NODE_ENV === 'dev' ? true : false;

export const getUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(USERS));
};

export const getUserById = (userId, res) => {
  try {
    if (isDEV) console.log(userId);
    const user = USERS.find((user) => user.id === userId);

    if (!user) throw new NotFoundError(`User with id ${userId} not found`);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (isDEV) console.log(error);
    const resCode = error instanceof NotFoundError ? 404 : 500;
    res.writeHead(resCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
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

    USERS.push(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (isDEV) console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
  }
};

export const editUsersById = (req, res) => {
  try {
    const { id } = req.params;
    const { username, age, hobbies } = req.body;

    if (!isValide({ username, age, hobbies }, userScheme)) {
      throw new ValidationError('Invalid user data');
    }

    const userIndex = USERS.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    const user = new User({
      id,
      username,
      age,
      hobbies,
    });
    USERS[userIndex] = user;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (isDEV) console.log(error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
  }
};

export const deleteUserById = (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = USERS.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    USERS.splice(userIndex, 1);
    res.status(204).send();
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};
