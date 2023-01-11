const Card = require('../models/card');
const { checkNotFoundError, handleError } = require('../utils/errorChecking');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => handleError(res, err));

const deleteCard = (req, res) => {
  const currentUser = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (currentUser !== card.owner.toString()) {
        return res
          .status(401)
          .send({ message: 'Вы не можете удалить данную публикацию, так как не являетесь ее автором' });
      }
      return Card.findByIdAndRemove(req.params.cardId, { new: true })
        .then((cards) => {
          checkNotFoundError(cards);
          return res.send({ data: cards });
        })
        .catch((err) => handleError(res, err));
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      checkNotFoundError(card);
      return res.send({ data: card });
    })
    .catch((err) => handleError(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkNotFoundError(card);
      return res.send(card);
    })
    .catch((err) => handleError(res, err));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkNotFoundError(card);
      return res.send(card);
    })
    .catch((err) => handleError(res, err));
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
};
