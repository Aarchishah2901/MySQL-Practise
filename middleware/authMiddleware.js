const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

//Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

//Role Middleware (HR only)
const isHR = (req, res, next) => {
  if (req.user && req.user.role === 'hr') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: HR only' });
};

module.exports = { authenticate, isHR };