const router = require('express').Router();
const {
  getUsers, getUserById, createUser, changeInfo, changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);

router.get('/users/:userId', getUserById);

router.patch('/users/me', changeInfo);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;
