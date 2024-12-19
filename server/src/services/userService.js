import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || 'MYSECRET';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

const tokenBlacklist = new Set(); 
const userService = {
    async register(email, password, username, tel) {
        const user = await User.findOne({ email });

        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ 
            email, 
            password: hashedPassword, 
            username, 
            tel 
        });

        return generateResponse(createdUser);
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        return generateResponse(user);
    },

    logout(token) {

        if (!token) {
            throw new Error('Token is required to logout');
        }

        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            throw new Error('Invalid token');
        }

        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000); // Remaining time in seconds
        tokenBlacklist.add(token); // Add to blacklist

        return { success: true, message: 'Logged out successfully' };
    },

    isTokenValid(token) {
        // Check if token is blacklisted
        if (tokenBlacklist.has(token)) {
            return false;
        }

        try {
            jwt.verify(token, JWT_SECRET);
            return true;
        } catch (err) {
            return false;
        }
    },
};

function generateResponse(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        tel: user.tel,
        accessToken: token,
    };

    
}

export default userService;
