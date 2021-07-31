const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/user');

function verificaUsuario(usuario){
  if(!usuario) throw new Error();
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if(!senhaValida) throw console.log('E-mail ou senha inválidos!');
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    session: false
  }, async(email, senha, done) => {
    try {
      const usuario = await Usuario.getUser(email);
      verificaUsuario(usuario);
      await verificaSenha(senha, usuario.senha);
      done(null, usuario)
    
    } catch (error) {
      done(error);
    }
    
  })
)
