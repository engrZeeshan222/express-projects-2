const admins = require("../models/admins-model");
const admin_auth = require("../models/admin-auth-model");
const {
  CheckIfAdminAlreadyExist,
  FindAdminUser,
} = require("./database-controller");
const {
  sendEmailVerification,
  hashPassword,
  generateJWToken,
} = require("../util/auth.utility");
const { StatusCodes } = require("http-status-codes");


//!Create New Admin
exports.createUserController = async (req, res) => {
  const {
    uid,
    email,
    password,
    firstName,
    lastName,
    phone,
    country,
    refCode,
    referredBy,
    typeOfLogin,
  } = req.body;
  ///! Uncomment this code for decrypting data in PROD.
  //    const uid = await decryptData(req.body.uid);
  //     const email = await decryptData(req.body.email);
  //      const password = await decryptData(req.body.password);
  //    const firstName = await decryptData(req.body.firstName);
  //  const lastName = await decryptData(req.body.lastName);
  //  const phone = await decryptData(req.body.phone);
  //   const country = await decryptData(req.body.country);
  //   const refCode = await decryptData(req.body.refCode);
  //   const referredBy = await decryptData(req.body.referredBy);
  //  const typeOfLogin = await decryptData(req.body.typeOfLogin);

  //default value
  const emailVerify = false,
    profilePic = "https://bit.ly/3iVdI6g";
  const saveValue = {
    uid,
    email,
    firstName,
    lastName,
    phone,
    country,
    typeOfLogin,
    profilePic,
    emailVerify,
  };
 
  await CheckIfAdminAlreadyExist(email);
  //hash password
  const hashedPassword = await hashPassword(password);
  await admins.create({ ...saveValue }); //Save to user database
  await admin_auth.create({ uid, hashedPassword }); //save to Password database
  sendEmailVerification(email, firstName);
  return res.status(StatusCodes.CREATED).json({
    status: true,
    message:
      "User created successfully, Please check your Email for verification",
  });
};


//!User Login
exports.loginUserController = async (req, res) => {
  console.log(req.body.email);
  const email  = req.body.email;
  if (!email) {
    throw new BadRequest("You must provide your Email Address");
  }
    const data = await FindAdminUser(email);
    const { uid } = data.dataValues;
    const token = await generateJWToken(uid, email);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Login attempt success",
      token: token,
      userData: data,
    });
};

//!Fetch current user details
exports.currentUserController = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    userData: req.user,
  });
};
