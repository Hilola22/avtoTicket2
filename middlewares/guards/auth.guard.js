const { authorJwtService } = require("../../services/jwt.service");
const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "Auth header not found" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Token not found" });
    }

    const decodedToken = await authorJwtService.verifyAccessToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
