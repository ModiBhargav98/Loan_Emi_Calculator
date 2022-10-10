const catchAsyncError = require("../middleware/catchAsyncError");
const EmiDb = require("../model/emihistory");

exports.getEmiHistory = catchAsyncError(async (req, res, next) => {
  const userEmiHistory = await EmiDb.findOne({ userId: req.params.userId });
  if (!userEmiHistory) {
    res
      .status(200)
      .json({ success: false, msg: "Your Emi History Not Founded" });
  }
  res.status(200).json({ success: true, msg: userEmiHistory });
});

exports.createEmiHistory = catchAsyncError(async (req, res, next) => {
  const emiDetail = await EmiDb.findOne({ userId: req.params.userId });
  if (!emiDetail) {
    const userData = await EmiDb.create({
      userId: req.params.userId,
      emiHistory: [req.body],
    });
    res.status(200).json({
      success: true,
      msg: userData,
    });
  } else {
    emiDetail.emiHistory.push(req.body);
    const userResult = await emiDetail.save();
    res.status(200).json({
      success: true,
      msg: emiDetail,
    });
  }
});
