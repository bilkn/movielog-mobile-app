const UserSchema = new Mongoose.Schema({
  id: { type: Number, required: true },
  watchList: [],
  watchedList: [],
});
const UserModel = Mongoose.model("User", UserSchema);

module.exports = UserModel;
