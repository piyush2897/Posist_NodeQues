var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = '123456';

module.exports = function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,key)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}