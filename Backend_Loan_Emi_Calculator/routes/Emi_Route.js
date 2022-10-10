const express = require("express");
const passport = require("passport");
const authentication = require("../middleware/auth")
const { createEmiHistory,getEmiHistory } = require("../controller/LoanemiController")
const emiRouter = express.Router();

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
// emiRouter.use()
emiRouter.get('/get-emi-details/:userId',authentication,getEmiHistory);
emiRouter.put('/loan-emi/:userId', createEmiHistory);

module.exports = emiRouter