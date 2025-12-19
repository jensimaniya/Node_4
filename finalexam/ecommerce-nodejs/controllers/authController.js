const jwt = require('jsonwebtoken');
const User = require('../models/User');

const cookieName = process.env.COOKIE_NAME || 'token';
const jwtSecret = process.env.JWT_SECRET || 'secret';
const jwtExpiry = process.env.JWT_EXPIRES_IN || '7d';

function generateToken(user){
  return jwt.sign({
    id: user._id,
    username: user.username,
    role: user.role
  }, jwtSecret, { expiresIn: jwtExpiry });
}

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  try{
    const { username, password, role } = req.body;
    const user = new User({ username, password, role: role || 'user' });
    await user.save();
    res.redirect('/login');
  }catch(err){
    console.error(err);
    res.render('register', { error: 'Registration failed. '+err.message });
  }
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.render('login', { error: 'Invalid credentials' });
    const matched = await user.comparePassword(password);
    if(!matched) return res.render('login', { error: 'Invalid credentials' });
    const token = generateToken(user);
    res.cookie(cookieName, token, { httpOnly: true, maxAge: 1000*60*60*24*7 });
    res.redirect('/products');
  }catch(err){
    console.error(err);
    res.render('login', { error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie(cookieName);
  res.redirect('/login');
};

