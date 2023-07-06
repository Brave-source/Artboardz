const crypto = require("crypto");

// Hash Token
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
  };

export default hashToken;