import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import e from "express";

function init(passport, getUserbyEmail, getUserbyId) {
  async function authentictUser(email, password, done) {
    const user = getUserbyEmail(email);
    if (user == null) {
      return done(null, false, { message: "no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, { message: "user password is incorrect" });
      }
    } catch (error) {
      return done(e);
    }
  }

  passport.use(
    new LocalStrategy(
      {
        username: "username",
      },
      authentictUser
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, getUserbyId(id));
  });
}
export { init };
