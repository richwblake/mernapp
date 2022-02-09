const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'))

app.get('/teapot', (req, res) => {
  res.status(418).json({
    message: "I am quite short and stout!"
  });
})

app.listen(port, () => console.log(`Server started on port ${port}`));