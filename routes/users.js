const router = require('express').Router();
const {
  getUsers, getUserById, changeInfo, changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', changeInfo);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;
