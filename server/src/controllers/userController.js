import { Router } from 'express';
import userService from '../services/userService.js';
import User from '../models/userModel.js';
const userController = Router();
userController.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        console.log(users); 
        res.status(200).json(users); 
    } catch (error) {
        console.log('Error fetching users:', error); 
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
