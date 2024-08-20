const { catchAsyncErrors } = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const { sendToken } = require('../utils/sendToken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Controller to fetch the current authenticated user's information
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    try {
        // Retrieve user ID from the request object (set by the isAuthenticated middleware)
        const userId = req.id;

        // Find the user in the database based on the ID
        const user = await User.findById(userId);

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send user data in the response
        res.json({ success: true, user });
    } catch (error) {
        // Log the error and return a 500 status code for internal server error
        console.error('Error fetching current user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Controller to handle user signup/registration
exports.signUp = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            email,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Send a JWT token as a response
        sendToken(newUser, 201, res);
    } catch (error) {
        // Log the error and return a 500 status code for internal server error
        console.error('Error registering new user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Controller to handle user login
exports.login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isPasswordMatch = await user.comparePassword(password);

        // If password does not match, return 401
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If everything is correct, send a JWT token as a response
        sendToken(user, 200, res);
    } catch (error) {
        // Log the error and return a 500 status code for internal server error
        console.error('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Controller to handle user logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    // Clear the JWT token cookie
    res.clearCookie("token");

    // Send a success response
    res.json({ message: "Successfully signed out" });
});
