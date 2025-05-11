import { validate } from "uuid";
import { deleteUserById, editUsersById, getUserById, getUsers } from "./users.service.js";

export const usersController = (req, res) => {
  try {
    
    const path = req.url;
    const method = req.method;
    console.log(`Request method: ${method}, Request path: ${path}`);
    const userId = path.split('/')[3];
    if (userId) {
      console.log(`User ID: ${userId}`);
      if (!validate(userId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user ID format' }));
        return;
      }
    if (method === 'GET') return getUserById(userId, res);
    if (method === 'PUT') return editUsersById(req, res);
    if (method === 'DELETE') return deleteUserById(req, res);
  } else {
    if (method === 'GET') return getUsers(req, res);
    if (method === 'POST') return createUser(req, res);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Requested URL not have on this server\n');
  return;
} catch (error) {

}
}
