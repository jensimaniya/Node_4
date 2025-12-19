const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookieName = process.env.COOKIE_NAME || 'token';
const jwtSecret = process.env.JWT_SECRET || 'secret';

exports.authenticate = async (req, res, next) => {
  const token = req.cookies[cookieName];
  if(!token) {
    req.user = null;
    return next();
  }
  try{
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.id).select('-password');
    req.user = user;
    res.locals.currentUser = user;
    res.locals.isAuthenticated = true;
    next();
  }catch(err){
    res.clearCookie(cookieName);
    req.user = null;
    res.locals.isAuthenticated = false;
    next();
  }
};

// protect routes that require login
exports.requireAuth = (req, res, next) => {
  if(!req.user) return res.redirect('/login');
  next();
};

// check role
exports.requireRole = (role) => (req, res, next) => {
  if(!req.user) return res.redirect('/login');
  if(req.user.role !== role) return res.status(403).send('Forbidden - insufficient role');
  next();
};
