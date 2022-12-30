const router = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { throwEror } = require('../utils/throwError');

router.get('/cards', getCards);
router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.all('*', throwEror);

module.exports = router;
