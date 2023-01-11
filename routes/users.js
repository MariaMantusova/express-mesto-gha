const router = require('express').Router();
const {
  getUsers, getUserById, changeInfo, changeAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);

router.get('/users/:userId', auth, getUserById);

router.patch('/users/me', auth, changeInfo);
router.patch('/users/me/avatar', auth, changeAvatar);

module.exports = router;
