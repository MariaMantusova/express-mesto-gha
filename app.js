const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mesto');

app.use((req, res, next) => {
  req.user = {
    _id: '63ac592733e3644cc49fc825',
  };

  next();
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT);
