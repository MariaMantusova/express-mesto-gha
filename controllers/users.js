const User = require('../models/user');
const { checkNotFoundError, handleError } = require('../utils/errorChecking');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => handleError(res, err));

const getUserById = (req, res) => User.findById(req.params._id)
  .then((user) => {
    checkNotFoundError(!user);
    return res.status(200).send(user);
  })
  .catch((err) => handleError(res, err));

const createUser = ((req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      checkNotFoundError(!user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
});

const changeInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      checkNotFoundError(!user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      checkNotFoundError(!user);
      return res.status(200).send({ data: user });
    })
    .catch((err) => handleError(res, err));
};

module.exports = {
  getUsers, getUserById, createUser, changeInfo, changeAvatar,
};