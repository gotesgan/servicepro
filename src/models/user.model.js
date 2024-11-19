import { app } from "../app.js";
import bcrypt from "bcrypt";
import { prisma } from "../db/db.js";
import { Strategy } from "passport-local";
import passport from "passport";

let salt = Number(`${process.env.saltRounds}`);
console.log(salt);
const registerUser = async (req, res) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: `${email}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(user);

    if (user === null) {
      function isValidEmail(email) {
        var regex =
          /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }

      if (isValidEmail(email) === true) {
        let Nname = name.toLowerCase();
        const userPassword = password;
        const Epassword = await bcrypt.hashSync(userPassword, salt);

        try {
          const user = await prisma.user.create({
            data: {
              name: `${Nname}`,
              email: `${email}`,
              password: `${Epassword}`,
            },
          });
        } catch (error) {
          console.log(error, "user ceration filed");
        }
        res.send(200).json({
          message: "User created Succesfuly",
        });
        console.log(user);
      } else {
        res.send(400).json({
          message: "invalid email id",
        });
      }
    }
  }

  res.send("200");
};

const loginrUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  successFlash: true,
  failureFlash: true,
  if(successRedirect) {
    res.send(200);
  },
});
export { loginrUser };

export { registerUser };
