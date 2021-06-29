import { createMiddleware } from 'next-haggis';
import HTTP_CODES from './constants';

const logger = createMiddleware((req, res, next) => {
  const message = `Intercepted ${req.method} request to ${req.url}`;
  console.log(message);
  return next(req, res);
});

const customLogger = createMiddleware((req, res, next, customMessage) => {
  console.log(customMessage);
  const message = `
        Intercepted ${req.method} request to ${req.url}
        `;
  console.log(message);
  return next(req, res);
});

const validate = createMiddleware(async (req, res, next, schema) => {
  try {
    await schema.validate(req.body);
  } catch (error) {
    console.log('Validation error');
    console.log({ error });
    return res.status(HTTP_CODES.BAD_REQUEST).send(error.message);
  }

  next(req, res);
});

export { logger, customLogger, validate };
