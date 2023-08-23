const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(createCustomError("Authentication Invalid.", 401));
  }
  const token = authHeader.split(" ")[1];

  //verify client-token
  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    console.log(payload.id, payload.username);
    // attaching specific user to its task routes by creating "user" property in "req" obj
    req.user = { userID: payload.id, name: payload.username };
    next();
  } catch (error) {
    return next(createCustomError("Authentication Invalid.", 401));
  }
};

module.exports = authenticate;
