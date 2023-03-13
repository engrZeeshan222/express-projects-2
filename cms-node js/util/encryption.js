require("dotenv").config();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPT_SECRET_KEY);

exports.encryptData = async (data) => {
  const encryptedString = cryptr.encrypt(data);
  return encryptedString;
};

exports.decryptData = async (encryptedData) => {
  const decryptedString = cryptr.decrypt(encryptedData);
  console.log(decryptedString); // bacon
return decryptedString;
};
