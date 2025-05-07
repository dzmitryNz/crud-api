export const ErrorHandler = (error, req, res) => {
  console.error(error);

  if (error instanceof ValidationError) {
    res.status(400).json({
      message: error.message,
    });
  } else if (error instanceof BadRequestError) {
    res.status(400).json({
      message: error.message,
    });
  } else if (error instanceof NotFoundError) {
    res.status(404).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}
