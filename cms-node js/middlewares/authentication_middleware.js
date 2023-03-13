const jwt = require("jsonwebtoken")
const { Unauthenticated, CustomHttpError } = require("../errors");
const Admins = require("../models/admins-model");


exports.authenticationMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Unauthenticated("Could not autheneticate user");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET);
    const currentUser = await Admins.findOne({
      where: {
        uid: payload.data.uid,
      },
    });
    req.user = currentUser.dataValues;
    next();
  } catch (error) {
    if (error instanceof CustomHttpError) {
      // this block is because of the BadRequest Error
      // that will be thrown in confirmVerfication middleware
      throw error;
    }
    console.log(error);
    throw new Unauthenticated("Could not authenticate user");
  }
};
