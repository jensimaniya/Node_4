require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

const app = express();
const PORT = process.env.PORT || 3000;

// DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('MongoDB connected'))
.catch(err=> console.error('MongoDB error', err));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// simple middleware to make user available to views
app.use((req, res, next) => {
  res.locals.currentUser = null;
  const token = req.cookies[process.env.COOKIE_NAME || 'token'];
  res.locals.isAuthenticated = !!token;
  next();
});

// routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

app.get('/', (req, res) => res.redirect('/products'));

app.listen(PORT, ()=> console.log('Server running on port', PORT));
