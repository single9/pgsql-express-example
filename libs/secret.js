const crypto = require('crypto');
const secret = require('../configs.json').secret;

module.exports.encryptPassword = function (plainText, pepper) {
  return crypto.createHmac('sha256', plainText)
               .update(secret).update(pepper).digest('base64');
};