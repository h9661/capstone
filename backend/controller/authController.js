const bycrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const exUser = await User.findOne({ where: { username } });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const hash = await bycrypt.hash(password, 12);
    await User.create({
      email,
      username,
      password: hash,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      // not found error http code
      return res.status(404).send(info.message);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      // success http code
      return res.sendStatus(200);
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy();

  // success http code
  res.sendStatus(200);
};
