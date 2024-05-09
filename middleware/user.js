const { User } = require("../db/index");
async function usermiddle(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const value = await User.findOne({
    username: username,
    password: password,
  });
  if (value) {
    next();
  } else {
    res.status(403).json({
      msg: "teri toh user hone ki aukat nhi hai",
    });
  }
}
module.exports = usermiddle;
