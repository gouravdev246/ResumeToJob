import jwt from 'jsonwebtoken' 
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'




export const registerUser = async (req, res) => {
    try {
        const { name, email , password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
        }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            partitioned: true
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            partitioned: true
        });

        user.password = undefined;
        res.status(200).json({
            message: "User logged in successfully",
            user: user
        });

    } catch (err) {
        console.log("Error", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true
        });
        return res.status(200).json({
            message: "User logged out successfully"
        
        });
    } catch (err) {
        console.log("Error during logout:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};