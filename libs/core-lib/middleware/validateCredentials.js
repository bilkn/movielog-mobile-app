const { compareSync } = require("bcrypt");
const { findUserByID } = require("../services/AuthService");

async function validateCredentials(req, res, next) {
  const { password } = req.body;
  const id = req.body.id || req.user.id;
  try {
    const user = await findUserByID(id);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "No user is found by given id!" });
    }

    if (!compareSync(password, user.password)) {
      return res
        .status(401)
        .send({ success: false, message: "Wrong password, please try again!" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "An error occurred on the auth server.",
    });
    console.log(err);
  }
}

module.exports = validateCredentials;
