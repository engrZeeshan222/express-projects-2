const Admins = require("../models/admins-model");
const {
  NotFound,
  Unauthenticated,
  BadRequest,
} = require("../errors");

//Find User with Uuid user
exports.FindAdminUser = async (email) => {
  const admin = await Admins.findOne({
    where: {
      email,
    },
  });
  if (admin == null) {
    throw new NotFound("User doesn't Exist");
  } 
  else if (!admin.dataValues.emailVerify || admin.dataValues.emailVerify == 0) {
    throw new Unauthenticated("You haven't yet verify your Email");
  }else if (admin.dataValues.disabled == 1) {
    throw new Unauthenticated(
      "Your account is disabled, Please contact the Admin"
    );
  }else if (admin.dataValues.blocked == 1) {
    throw new Unauthenticated(
      "Your account is blocked, Please contact the Admin"
    );
  }
  return admin;
};

exports.CheckIfAdminAlreadyExist = async (email) => {
  const admin = await Admins.findOne({
    where: {
      email
    },
  });
  if (admin == null) {
    return null;
  } else {
    if (admin.dataValues.uid != null) {
      throw new BadRequest("Sorry, This Admin is already Exist");
    }
  }
};


exports.UpdateUserEmailVerifyStatus = async (email) => {
  try {
    await Admins.update({ emailVerify: true }, { where: { email: email } });
  } catch (error) {
    throw new BadRequest(error);
  }
};



//We are no longer Use it because User will only sign-in with Email
// exports.searchPassword = async (uid) => {
//   try {
//     const user = await Auth.findOne({
//   where: {
//     uid
//   }
// }); //search uid and retun hash Password
//     console.log(user);
//     return user.hashedPassword;
//   } catch (error) {
//     console.log(error);
//     throw new Unauthenticated("Invalid credentials");
//   }
// };

//   class AuthException extends Error {
//     constructor() {
//       super();

//       this.message = "invalid credentials";
//       this.statusCode = 401;
//       this.isDeveloperError = false;
//       this.stack = null;
//     }
//   }

//   module.exports = AuthException;
// };


//