const sendErrorResponse = (error, res) => {
  console.log(error);
  res.status(400).send({ message: "Xatolik", error: error.message });
};

module.exports = {
  sendErrorResponse,
};

// const sendErrorResponse = (error, res, status) => {
//   console.log(error);
//   res.status(status).send({ message: "Xatolik", error: error.message });
// };

// module.exports = {
//   sendErrorResponse,
// };
