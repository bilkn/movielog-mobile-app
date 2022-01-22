const { UserModel } = require("../models/");

function createUser(userID) {
  return new UserModel({ id: userID }).save();
}

function getUser(id) {
  return UserModel.findOne({ id });
}

function deleteUser(id) {
  return UserModel.deleteOne({ id });
}

async function resetUserData(id) {
  return UserModel.updateOne(
    { id },
    { $set: { watchList: [], watchedList: [] } }
  );
}

function addItemToList(id, listName, item) {
  return UserModel.updateOne({ id }, { $addToSet: { [listName]: item } });
}

function getList(id, listName) {
  return UserModel.findOne({ id }, { _id: 0, [listName]: 1 });
}

function deleteItemFromList(userID, listName, itemID) {
  return UserModel.updateOne(
    { id: userID },
    { $pull: { [listName]: { id: +itemID } } }
  );
}

module.exports = {
  createUser,
  deleteUser,
  getUser,
  addItemToList,
  getList,
  resetUserData,
  deleteItemFromList,
};
