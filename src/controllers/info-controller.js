const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Task Management  API is live",
    error: {},
    data: {},
  });
};

module.exports = {
  info,
};
