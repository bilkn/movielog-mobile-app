const { default: mongoose } = require("../helpers/mongodb-connect");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  watchList: [],
  watchedList: [],
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
