import { HttpError } from "../helpers/index.js"

const isPatchBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if(!length) {
    next(HttpError(400, "missing field favorite"))
  }
  next()
}

export default isPatchBody;