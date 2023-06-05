const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unautshorized', token: token, error:err });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = isAuthenticated;

