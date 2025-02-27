const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./authenticate'); // Import auth logic

const app = express();
const port = 3500;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Home page route
app.get('/', (req, res) => {
  res.render('index');
});

// Registration page route
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration logic
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  auth.registerUser(email, password, (message) => {
    res.render('register', { message });
  });
});

// Login page route
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login logic
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  auth.loginUser(email, password, (message) => {
    if (message === 'Login successful!') {
      res.redirect('/profile');
    } else {
      res.render('login', { message });
    }
  });
});

// Profile page route (protected)
app.get('/profile', (req, res) => {
  res.render('profile', { user: { email: 'test@example.com' } }); // Placeholder user data
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
