const User = require('../app/models/user'); // Import the User model

const authenticate = async (req, res, next) => {
  const { email, password } = req.body; // Extract email and password from the request body

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Fetch user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Add logic to compare passwords (replace with your password hashing logic, e.g., bcrypt)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Authentication successful
    req.user = user; // Attach user object to request for further use
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed.' });
  }
};

module.exports = authenticate;
