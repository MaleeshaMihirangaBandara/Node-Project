var config = {}

config.connectionSrting = "mongodb://localhost:27017/eCommerceDb";
config.port = 3000;
config.expiresTime = '30h';
config.jwtSecretKey = "TOKEN_KEY";
config.encryptorSecretKey = 'MytotalsecurityMytotalsecurity';


module.exports = config;