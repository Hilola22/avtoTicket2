const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = (req, res, next) => {
  try {
    if (req.params.id != req.user.id) {
      return res.status(403).send({
        message:
          "Ruxsat etilmagan foydalanuvchi. Faqat shaxsiy ma'lumotlarni ko'rish mumkin!",
      });
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};