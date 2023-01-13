const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, changeInfo, changeAvatar, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/users/me', auth, changeInfo);
router.patch('/users/me/avatar', auth, changeAvatar);

module.exports = router;
