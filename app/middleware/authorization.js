const jwt = require('jsonwebtoken'); // For verifying tokens
const User = require('../models/users.model'); // Import User model (optional for role checks)

// Middleware for authorization
const authorize = (roles = []) => {
  // If roles is a single string, convert it to an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add decoded user data to the request object

      // Optional: Fetch the user's role from the database (if roles are needed)
      if (roles.length) {
        const user = await User.findByPk(decoded.id); // Find user by ID
        if (!user || !roles.includes(user.role)) {
          return res.status(403).json({ error: 'Forbidden: Access denied' });
        }
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = authorize;
