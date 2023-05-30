const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the request body
    const { error } = registerSchema.validate({ username, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hashPassword(password);

    // Create a new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the request body
    const { error } = loginSchema.validate({ username, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.generateToken({ userId: user._id }, process.env.JWT_EXPIRATION);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Verify the JWT token
    const decodedToken = jwt.verifyToken(token);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
