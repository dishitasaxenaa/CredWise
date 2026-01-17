const jwt = require("jsonwebtoken");
const { authenticateBankUser } = require("../services/bankAuth.service");
const maskAccount = require("../utils/maskAccount");

exports.connectBank = async (req, res) => {
  try {
    const { bankName, ifsc, accountNumber, pin } = req.body;

    if (!bankName || !ifsc || !accountNumber || !pin) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const account = await authenticateBankUser({
      bankName,
      ifsc,
      accountNumber,
      pin
    });

    // Generate session token (simulated bank session)
    const token = jwt.sign(
      {
        accountNumber: account.accountNumber,
        bank: bankName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Bank connected successfully",
      customer: {
        name: account.customer.name,
        email: account.customer.email
      },
      account: maskAccount(account.accountNumber),
      token
    });
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
};
