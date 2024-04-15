const User = require('../models/user'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for authentication

module.exports = {
  getuserDetailByJWT: async (req, res) => {
    try {
      // Extract JWT token from request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the format "Bearer token"

      // Validate token presence
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }

      // Verify the JWT token
      jwt.verify(token, 'test', async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        
        // Find user by decoded userId from token
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user details
        res.status(200).json({ message: 'User details retrieved successfully', user });
      });
    } catch (error) {
      console.error("Error getting user details from JWT:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
