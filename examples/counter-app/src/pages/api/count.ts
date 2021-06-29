import { NextApiRequest, NextApiResponse } from "next";
import { postCount as postCountSchema } from "../../validationSchemas";
import { RouteHandler } from "next-haggis";
import { logger, validate } from "../../middlewares";

const DB = { count: 10 };

class Handler extends RouteHandler {
  @logger
  get(req: NextApiRequest, res: NextApiResponse) {
    const { count } = DB;
    return res.send({ count });
  }

  @logger
  @validate(postCountSchema)
  put(req: NextApiRequest, res: NextApiResponse) {
    const { count } = req.body;
    DB.count = count;
    return res.send({ count: DB.count });
  }
}

export default new Handler();
