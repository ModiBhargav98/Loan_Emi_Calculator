const catchAsyncError = require("../middleware/catchAsyncError");
const config = require("../config/config")
const UserDb = require("../model/user");
const jwt = require("jsonwebtoken");

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email,password} = req.body
    const userData = {
      email:email,
      password:password
    }
    const user = await UserDb.findOne({email:email,password:password});
    let token1 = jwt.sign({ userData }, config.secretKey, {
      algorithm: config.algorithm,
      expiresIn: "24h",
    });
    if(!user){
      return res.status(200).json({
        success: false,
        msg:"Please verify email and password",
      });
    }
    res.status(200).json({
      success: true,
      token:token1,
    });
  });

