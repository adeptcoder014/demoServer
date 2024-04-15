const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

module.exports = {

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 'message': 'Please provide email and password' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 'message': 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ 'message': 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'test', { expiresIn: '1h' });

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
