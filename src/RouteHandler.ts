import { NextApiRequest, NextApiResponse } from 'next';

export enum HTTP_VERB {
  DELETE = 'delete',
  GET = 'get',
  OPTIONS = 'options',
  PATH = 'patch',
  POST = 'post',
  PUT = 'put',
}

export type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void;

abstract class RouteHandler {
  delete?: RequestHandler;
  get?: RequestHandler;
  options?: RequestHandler;
  path?: RequestHandler;
  post?: RequestHandler;

  constructor() {
    // @ts-ignore
    return this.build();
  }

  build() {
    return (req: NextApiRequest, res: NextApiResponse) => {
      const requestedMethodHandler = req.method?.toLowerCase();
      if (
        requestedMethodHandler &&
        // @ts-ignore
        Object.values(HTTP_VERB).includes(requestedMethodHandler) &&
        // @ts-ignore
        typeof this[requestedMethodHandler] === 'function'
      ) {
        // @ts-ignore
        return this[requestedMethodHandler](req, res);
      }

      return this.methodMissingHandler(req, res);
    };
  }

  methodMissingHandler(req: NextApiRequest, res: NextApiResponse) {
    const errorMessage = `Method ${req.method} not implemented`;
    console.log(errorMessage);
    return res.status(405).send(errorMessage);
  }
}

export default RouteHandler;
