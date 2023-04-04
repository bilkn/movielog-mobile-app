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

function getList(id, listName, skip = 0) {
  const ITEMS_PER_PAGE = 10;
  console.log({skip});
  const aggregation = [
    {
      $match: {
        id,
      },
    },
    {
      $unwind: `$${listName}`
    },
    {
      $sort: {
        [`${listName}.watchDate`]: -1
      }
    },
    {
      $group: {
        _id: "$_id",
        [listName]: {
          $push: `$${listName}`
        }
      }
    },
    {
      $project: {
        _id: 0,
        [listName]: {
          $slice: [`$${listName}`, skip, ITEMS_PER_PAGE],
        },
        totalPages: {
          $ceil: { $divide: [{ $size: `$${listName}` }, ITEMS_PER_PAGE] },
        },
      },
    },
  ];

  return UserModel.aggregate(aggregation);
}

/* function getItemFromList(userID, itemID, listName) {
  return UserModel.exists({
    id: userID,
    [listName]: { $elemMatch: { id: itemID } },
  });
} */

function checkIfItemExistsInList(userID, itemID, listName) {
  return UserModel.exists({
    id: userID,
    [listName]: { $elemMatch: { id: +itemID } },
  });
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
  checkIfItemExistsInList,
};
