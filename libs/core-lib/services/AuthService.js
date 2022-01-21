const UserAuthModel = require("../models/UserAuthModel");

async function createAccount(email, username, password) {
  const userCount = await UserAuthModel.countDocuments({});
  const newUser = new UserAuthModel({
    id: userCount + 1,
    email,
    username,
    password,
  });
  return newUser.save();
}

function isEmailExist(email) {
  return UserAuthModel.exists({ email });
}

function deleteAccount(id) {
  return UserAuthModel.findOneAndDelete({ id });
}

function changePassword(id, newPassword) {
  return UserAuthModel.findOne({ id }).update({ password: newPassword });
}

function findUserByID(id) {
  return UserAuthModel.findOne({ id });
}

function findUserByEmail(email) {
  return UserAuthModel.findOne({ email });
}

function findUserByUsername(username) {
  return UserAuthModel.findOne({ username });
}

function updateProfile(id, newEmail, newUsername) {
  return UserAuthModel.updateOne(
    { id },
    { $set: { username: newUsername, email: newEmail } }
  );
}

module.exports = {
  createAccount,
  isEmailExist,
  findUserByID,
  findUserByEmail,
  findUserByUsername,
  updateProfile,
  deleteAccount,
  changePassword,
};
