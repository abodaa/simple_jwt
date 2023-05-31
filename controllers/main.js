const CustomAPIError = require("../errors/custom-error");

require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide username and password" });
    }
    // ID comes from DB, this is just for Demo
    const id = new Date().getDate();

    // Sign the json web token
    // Keep the payload (in this example, username and id is used) small for better users experience
    const jwtToken = jwt.sign({ username, id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ msg: "User added", token: jwtToken });
    console.log(username, password);
  } catch (error) {
    console.log(error);
  }
};

const dashboard = async (req, res) => {
  const {username} = req.user
  console.log(username)
  const luckyNum = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${username}, Welcome to your dashboard.`,
    secret: `Your secret number is : ${luckyNum}`,
  });
};

module.exports = { login, dashboard };
