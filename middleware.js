const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);  
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
