import passport from "passport";
import { Strategy } from "passport-local";
import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
function passportConfig() {
  passport.use(
    new Strategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: `${email}`,
          },
        });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const check = bcrypt.compare(user.password, password);
        if (!check) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
passportConfig();

export { passportConfig };
