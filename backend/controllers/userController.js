const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, password_conf } = req.body;
  
  if (!name || !email || !password || !password_conf) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (password !== password_conf) {
    res.status(400);
    throw new Error('Password and confirmation do not match');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      toekn: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const getMe = asyncHandler(async (req, res) => {
  console.log(req.user)
  res.json(req.user);
});
 
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
};