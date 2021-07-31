const jwt = require('jsonwebtoken');

const createTokenJWT = (usuario) => {
  const payload = {
    id: usuario.id
  }
  const token = jwt.sign(payload, 'senha-secreta');
  return token;
}

module.exports = createTokenJWT;
