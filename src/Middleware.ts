import { NextApiRequest, NextApiResponse } from 'next';

function middlewareToDecorator(middleware: Middleware): Decorator {
  function decorator(
    // @ts-ignore
    target: Object,
    // @ts-ignore
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function(
      req: NextApiRequest,
      res: NextApiResponse
    ): void {
      return middleware(req, res, original);
    };

    return descriptor;
  }

  return decorator;
}

function middlewareFactoryToDecoratorFactory(
  middleware: Middleware
): DecoratorFactory {
  function decoratorFactory(...args: any[]): Decorator {
    function decorator(
      // @ts-ignore
      target: Object,
      // @ts-ignore
      key: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value;
      descriptor.value = function(
        req: NextApiRequest,
        res: NextApiResponse
      ): void {
        return middleware(req, res, original, ...args);
      };

      return descriptor;
    }

    return decorator;
  }

  return decoratorFactory;
}

function createMiddleware(
  middleware: Middleware
): Decorator | DecoratorFactory {
  const customizable = middleware.length > 3;
  return customizable
    ? middlewareFactoryToDecoratorFactory(middleware)
    : middlewareToDecorator(middleware);
}

export { createMiddleware };
