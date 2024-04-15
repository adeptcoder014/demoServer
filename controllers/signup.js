const User = require('../models/user'); // Import the User model
const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  signup: async (req, res) => {
    try {
      console.log('======================================= started');

      // Extract data from request body
      const { name, phone, email, password } = req.body;

      // Validate input
      if (!name || !phone || !email || !password) {
        return res.status(400).json({ 'message': 'Please provide name, phone, email, and password' });
      }

      // Check if user with the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 'message': 'User with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance with hashed password
      const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
      });

      // Save the user data to MongoDB
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User signed up successfully', user: newUser });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
}
