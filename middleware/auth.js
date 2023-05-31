const jwt = require("jsonwebtoken");

const authenticationMiddleWare = async (req, res, next) => {
  const { authorization } = req.headers;
  const authHeader = authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        msg: "No Token Provided",
      });
    }

    // split the string to access the exact jwt token

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, username } = decoded;
      req.user = { id, username };
      next();
    } catch (error) {
      res.send({ msg: "You are not allowed to access this route OK!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticationMiddleWare;
