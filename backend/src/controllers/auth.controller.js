const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email } = req.body;

  // Mock login
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({
    message: "Login successful",
    token
  });
};
