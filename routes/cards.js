const router = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { throwEror } = require('../utils/throwError');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.post('/cards', auth, createCard);

router.delete('/cards/:cardId', auth, deleteCard);
router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);
router.all('*', throwEror);

module.exports = router;
