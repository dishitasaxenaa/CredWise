const maskAccount = require("../utils/maskaccount");

exports.connectBank = (req, res) => {
  const { bank, ifsc, accountNumber } = req.body;

  if (!bank || !ifsc || !accountNumber) {
    return res.status(400).json({ error: "Missing details" });
  }

  const masked = maskAccount(accountNumber);

  res.json({
    status: "Bank connected successfully",
    bank,
    account: masked
  });
};
