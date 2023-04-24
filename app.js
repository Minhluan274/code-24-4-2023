const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {check  } = require('express-validator');
const expressValidator = require('express-validator');
require("dotenv").config();

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
// app

const app = express();

console.log(process.env.DATABASE)

mongoose
    .connect('mongodb+srv://luan123:luan123@cluster-e-comerce.ktuhrgq.mongodb.net/?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("DATABASE Connected")).catch(err => console.log(err));

  

// middware
 app.use(morgan('dev'));
 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(expressValidator());
// validation middleware
app.use(
    check('name').notEmpty().withMessage('Name is required'),
    check('email')
      .notEmpty()
      .isEmail()
      .withMessage('email is require')
      .isLength({ min: 4, max: 32 })
      .withMessage('Email must be between 4 to 32 characters'),
    check('password')
      .notEmpty()
      .withMessage(' Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must contain at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
  );


 // routes middleware

 app.use("/api",userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Serving is running on port ${port}`);
});