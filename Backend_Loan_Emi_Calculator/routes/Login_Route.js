const express = require("express");
// const passport = require("passport");
const {loginUser} = require("../controller/LoginuserController")
const userRouter = express.Router();

// userRouter.get('/auth/facebook',
//   passport.authenticate('facebook'));

// userRouter.get('/auth/facebook/callback',
//   passport.authenticate("facebook", {
//     successRedirect: "/sucess",
//     failureRedirect: "/fail"
//   })
// );

// userRouter.route("fail").get((req,res) => {
//   res.send("Failed attempt");
// })

// userRouter.route("sucess").get((req,res) => {
//   res.send("Success");
// })
userRouter.post('/user-login',loginUser);


module.exports = userRouter