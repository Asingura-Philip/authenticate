const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json');

// Ensure users.json exists
function ensureUsersFileExists(callback) {
  fs.exists(usersFilePath, (exists) => {
    if (!exists) {
      fs.writeFile(usersFilePath, JSON.stringify([]), (err) => {
        if (err) throw err;
        callback();
      });
    } else {
      callback();
    }
  });
}

// Save user data to users.json
function saveUser(userData, callback) {
  ensureUsersFileExists(() => {
    fs.readFile(usersFilePath, (err, data) => {
      if (err) throw err;

      let users = JSON.parse(data);
      users.push(userData);

      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) throw err;
        callback('Registration successful!');
      });
    });
  });
}

// Get user by email
function getUserByEmail(email, callback) {
  fs.readFile(usersFilePath, (err, data) => {
    if (err) throw err;

    let users = JSON.parse(data);
    const user = users.find(u => u.email === email);
    callback(user);
  });
}

module.exports = { saveUser, getUserByEmail };