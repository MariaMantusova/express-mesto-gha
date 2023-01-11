const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3005 } = process.env;

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
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.listen(PORT);
