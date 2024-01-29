const fs = require("fs");

function logRequest(fileName) {
  return (req, res, next) => {
    const fs = require("fs");
    fs.appendFile(
      fileName,
      `${Date.now()} ${req.method}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logRequest };
