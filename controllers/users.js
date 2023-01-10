require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkNotFoundError, handleError } = require('../utils/errorChecking');

const getUsers = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => handleError(res, err));

const getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    checkNotFoundError(user);
    return res.status(200).send({ data: user });
  })
  .catch((err) => handleError(res, err));

const createUser = ((req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, hash,
      });
    })
    .then((user) => {
      checkNotFoundError(user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
});

const changeInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      checkNotFoundError(user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      checkNotFoundError(user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers, getUserById, createUser, changeInfo, changeAvatar, login,
};
