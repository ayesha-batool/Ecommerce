import { v2 as cloudinary } from 'cloudinary';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'; // ✅ correct spelling
import jwt from 'jsonwebtoken'; // ✅ correct spelling
import validator from 'validator'
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already existed" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter valid password" })

        }
        //hash user password
        const salt = await bcrypt.genSalt(10)
     
        const newUser = new userModel({
            name,
            email,
            password: password
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error adding user:", error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("loginUser",email,password);
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        console.log("user.password",user.password);
        console.log("password",password);
        if (user.password !== password) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

};


const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("Admin login attempt with:", { email, password });
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            console.log(email,password,process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }
        
        // Create token with proper payload structure
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export { registerUser, loginUser, adminLogin };
