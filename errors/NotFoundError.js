class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
