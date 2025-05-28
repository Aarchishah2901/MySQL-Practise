const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'your_jwt_secret';

exports.register = async (req, res) => {
  const { name, email, password, gender, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d'
    });
    
    return res
      .cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: {
          name: user.name,
          email: user.email,
          token: token
        }
      });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};