const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

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

app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT);
