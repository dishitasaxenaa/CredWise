const jwt = require("jsonwebtoken");

module.exports = function bankAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.bankSession = {
      accountNumber: decoded.accountNumber,
      bank: decoded.bank
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
