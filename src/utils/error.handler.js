export const ErrorHandler = (error, req, res) => {
  console.error('ErrorHandler', error);
 console.log(error instanceof Error);
  if (error instanceof ValidationError) {
    res.status(400).json({
      message: error.message,
    });
  } else if (error instanceof BadRequestError) {
    res.status(400).json({
      message: error.message,
    });
  } else if (error instanceof NotFoundError) {
    console.log('NotFoundError')
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
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
