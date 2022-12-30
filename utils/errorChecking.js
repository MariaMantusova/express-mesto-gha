const NotFoundError = require('../errors/NotFoundError');

const checkNotFoundError = (model) => {
  if (model === null) {
    throw new NotFoundError('NotFound');
  }
};

const handleError = (res, err) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError': {
      return res.status(400).send({ message: 'ValidationError' });
    }
    case 'NotFoundError': {
      return res.status(404).send({ message: 'NotFoundError' });
    }
    default: {
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    }
  }
};

module.exports = { checkNotFoundError, handleError };
