const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 

module.exports = {
  getuserDetailByJWT: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; 
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }

      jwt.verify(token, 'test', async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User details retrieved successfully', user });
      });
    } catch (error) {
      console.error("Error getting user details from JWT:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
