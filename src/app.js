import express from "express";
import session from "express-session";
import passport from "passport";
import flash from "express-flash";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
export { app };

import USerrouter from "./routes/user.route.js";

app.use("/users", USerrouter);
