const bcrypt = require('bcryptjs');
const user = require('./user');

// Register a new user
function registerUser(email, password, callback) {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    user.saveUser({ email, password: hashedPassword }, (message) => {
      callback(message);
    });
  });
}

// Login an existing user
function loginUser(email, password, callback) {
  user.getUserByEmail(email, (storedUser) => {
    if (!storedUser) {
      callback('User not found.');
      return;
    }

    bcrypt.compare(password, storedUser.password, (err, isMatch) => {
      if (err) throw err;
      
      if (isMatch) {
        callback('Login successful!');
      } else {
        callback('Incorrect password.');
      }
    });
  });
}

module.exports = { registerUser, loginUser };
