const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1h" });
  return token;
};

const authentication = (request, response, next) => {
  const beareHeader = request.headers["authorization"];

  const token = beareHeader.split(" ")[1];
  if (token == null) return response.status(401);

  jwt.verify(token, process.env.JWT_KEY, (error, data) => {
    if (error) return response.status(401);
    if (data.role === "Engineer") {
      next();
    } else {
      response.status(401).json({ message: "Unauthorized" });
    }
  });
};

module.exports = { signToken, authentication };
