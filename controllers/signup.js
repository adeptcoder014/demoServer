const User = require('../models/user'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
module.exports = {
  signup: async (req, res) => {
    try {
      console.log('======================================= started');

      const { name, phone, email, password } = req.body;

      if (!name || !phone || !email || !password) {
        return res.status(400).json({ 'message': 'Please provide name, phone, email, and password' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 'message': 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User signed up successfully', user: newUser });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
}
