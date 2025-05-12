import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor({ id, username, age, hobbies }) {
    this.id = id || uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export const userScheme = {
  id: { required: false, type: 'string' },
  username: { required: true, type: 'string' },
  age: { required: true, type: 'number' },
  hobbies: { required: true, type: 'array', arrayType: 'string', notEmpty: true },
};
