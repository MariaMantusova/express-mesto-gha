const NotFoundError = require('../errors/NotFoundError');

const checkNotFoundError = (model) => {
  if (model === null) {
    throw new NotFoundError('NotFound');
  }
};

const handleError = (res, err) => {
  switch (err.name) {
    case 'CastError': {
      return res.status(400).send('Bad request');
    }
    case 'ValidationError': {
      return res.status(400).send('ValidationError');
    }
    case 'NotFoundError': {
      return res.status(404).send('Not found');
    }
    default: {
      return res.status(500).send(`Произошла ошибка ${err}`);
    }
  }
};

module.exports = { checkNotFoundError, handleError };
