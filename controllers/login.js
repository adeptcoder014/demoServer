const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for authentication

module.exports = {

  login: async (req, res) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ 'message': 'Please provide email and password' });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 'message': 'Invalid email or password' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ 'message': 'Invalid email or password' });
      }

      // Generate JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'test', { expiresIn: '1h' });

      // Respond with success message and token
      res.status(200).json(
        {
          message: 'Login successful',
          token,
          user
        }
      );
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
