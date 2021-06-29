import { NextApiRequest, NextApiResponse } from "next";

declare global {
  type NextMiddlewareUtil = (req: NextApiRequest, res: NextApiResponse) => void;
  type Middleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextMiddlewareUtil,
    ...args: any[]
  ) => ReturnType<NextMiddlewareUtil>;

  type Decorator = (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => void;
  type DecoratorFactory = (...args: any[]) => void;
}
