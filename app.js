const express = require('express');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { handleError } = require('./utils/errorChecking');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mesto');

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
app.use('/', userRouter);
app.use('/', cardRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = handleError(err);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
