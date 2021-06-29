import RouteHandler from "./RouteHandler";
import { NextApiRequest, NextApiResponse } from "next";

export interface RouteHandlerConfig {
  methodMissingHandler?: (req: NextApiRequest, res: NextApiResponse) => void;
}

export default function ConfigurableRouteHandler(config: RouteHandlerConfig) {
  const { methodMissingHandler } = config;
  return class Test extends RouteHandler {
    methodMissingHandler(req: NextApiRequest, res: NextApiResponse) {
      return methodMissingHandler
        ? methodMissingHandler(req, res)
        : super.methodMissingHandler(req, res);
    }
  };
}
