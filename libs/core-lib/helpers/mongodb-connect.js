const mongoose = require("mongoose");

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;


async function main() {
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@maincluster.jbvab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
}

main().catch((err) => console.log(err));

module.exports = mongoose;
