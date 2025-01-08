const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const nodemailer = require('nodemailer');

// Register User
exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Login User

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get User Profile by user id and  bearer token for users and admin
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

//verify account using opt
exports.verifyAccount = async (req, res) => {
    const { otp } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.isVerified = true;
        user.otp = null;

        await user.save();

        res.status(200).json({ message: 'Account verified successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// forget password sent mail throung nodemailer
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        const user = await User.findOne({
            email,
        });
        // console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        await user.save();

        // Send OTP to user's email (email service integration needed) through node mailer
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'nwj.shrestha@gmail.com',
                pass: 'kcazmnuxtxeexnrx',

                // kcaz mnux txee xnrx
            },
        });

        const mailOptions = {
            from: "Luxestay@gmail.com",
            to: email,
            subject: "Reset Password OTP",
            text: `Your OTP to reset your password is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        }
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}


// Reset Passwordaccording to the otp
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user
            = await User.findOne({
                email,
                resetPasswordOTP: otp,
                resetPasswordExpires: { $gt: Date.now() },
            });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or OTP expired",
            });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        user.resetPasswordOTP = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}