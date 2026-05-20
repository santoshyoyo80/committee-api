const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

/*
  Temporary in-memory users
  Replace later with database
*/
let users = [];

/*
  Register API
*/
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User registered successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

/*
  Login API
*/
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(
      user => user.email === email
    );

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json({
      token
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

/*
  Profile API
*/
router.get(
  '/profile',
  authMiddleware,
  (req, res) => {

    const user = users.find(
      user => user.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
);

/*
  List Users API
*/
router.get(
  '/users',
  authMiddleware,
  (req, res) => {

    const userList = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));

    res.json(userList);
  }
);

module.exports = router;