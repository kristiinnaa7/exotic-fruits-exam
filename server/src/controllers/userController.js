import { Router } from 'express';
import userService from '../services/userService.js';
import User from '../models/userModel.js';
const userController = Router();
userController.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Query to get all users
        console.log(users); // Logs the users fetched from the database
        res.status(200).json(users); // Sends the users as a response
    } catch (error) {
        console.log('Error fetching users:', error); // Logs any error during the query
        res.status(500).json({ message: error.message });
    }
});
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
userController.post('/register', async (req, res) => {
    const { email, password, username, tel } = req.body

    const result = await userService.register(email, password, username, tel);

    res.json(result);
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await userService.login(email, password);

    res.json(result);
});

userController.get('/logout', async (req, res) => {
    await userService.logout(); 

    res.status(204).end();
});

export default userController;
