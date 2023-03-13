const Joi = require("joi")
const RequiredString = Joi.string().required()

exports.createUserSchema = Joi.object({
  uid: RequiredString,
  email: RequiredString.email(),
  password: RequiredString,
  firstName: RequiredString,
  lastName: RequiredString,
  phone: RequiredString,
  country: RequiredString,
  refCode: Joi.string().allow(""),
  referredBy: Joi.string().allow(""),
  typeOfLogin: RequiredString,
});


