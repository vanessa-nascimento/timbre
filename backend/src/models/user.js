const db = require("../config/database");

class Usuario {
  constructor(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.data_nascimento = usuario.data_nascimento;
  }

  static async getUser(email) {
    
    const result = await db.query(
        `SELECT email, senha FROM usuario WHERE email = $1`, [email])
          .then(res => res.rows[0])
          .catch(e => console.error(e.stack)
      );
  
      if (!result) {
        return null;
      }
      
      return new Usuario(result);
  
  }
}

module.exports = Usuario;
