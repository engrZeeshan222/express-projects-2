require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmailVerification } = require("../util/email");
const {
  generateVerificationHash,
  verifyHash,
} = require("dbless-email-verification");

//Create JWt Token
exports.generateJWToken = async (uid, email) => {
  const token = await jwt.sign(
    {
      data: {
        uid: uid,
        email: email,
      },
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

//Verify JWT TOKEN
exports.verifyJWT = async (token) => {
  const result = await jwt.verify(token, process.env.SECRET);
  return result;
};

//HAsH PASSWORD
exports.hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(pass, salt);
  return result;
};


//Check and Validate PASSWORD
exports.validatePassword = async (uid, password) => {
const savedPassword = await databaseController.searchPassword(uid);
 const comparePassword = await bcrypt.compare(password, savedPassword);
 if (!comparePassword) {
   throw new Unauthenticated("Invalid credentials");
 }
return true; //Yes, It's a compatible password
};

exports.sendEmailVerification = async (email, firstName) => {
  const hash = generateVerificationHash(
    email,
    process.env.GENERATE_VERIFICATION_SECRET,
    10
  );
  // add the email and generated hash to the verification link
  const verifyLink =
    process.env.BASE_URL + "auth/verifyemail/?&email=" + email + "&qu=" + hash;
  console.log(verifyLink);
   await sendEmailVerification({ to: email, verifyLink, name: firstName });
};

exports.verifyEmailDuringSignUp = async (email, qu) => {
  const isEmailVerified = verifyHash(
    qu,
    email,
    process.env.GENERATE_VERIFICATION_SECRET
  );
  return isEmailVerified;
};
