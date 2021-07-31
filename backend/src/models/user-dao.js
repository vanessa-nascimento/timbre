const db = require("../config/database");
const { InternalServerError } = require('../erros');

module.exports = {
  adiciona: usuario => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO usuario (
            nome,
            email,
            senha,
            data_nascimento,
            cpf,
          ) VALUES ($1, $2, crypt($3, gen_salt('bf'), $4, $5)
        `,
        [usuario.nome, usuario.email, usuario.senha],
        erro => {
          if (erro) {
            reject(new InternalServerError('Erro ao adicionar o usuário!'));
          }

          return resolve();
        }
      );
    });
  },

  buscaPorId: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM usuarios
          WHERE id = ?
        `,
        [id],
        (erro, usuario) => {
          if (erro) {
            return reject('Não foi possível encontrar o usuário!');
          }

          return resolve(usuario);
        }
      );
    });
  },

  buscaPorEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM usuarios
          WHERE email = ?
        `,
        [email],
        (erro, usuario) => {
          if (erro) {
            return reject('Não foi possível encontrar o usuário!');
          }

          return resolve(usuario);
        }
      );
    });
  },

  lista: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM usuarios
        `,
        (erro, usuarios) => {
          if (erro) {
            return reject('Erro ao listar usuários');
          }
          return resolve(usuarios);
        }
      );
    });
  },

  deleta: usuario => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM usuarios
          WHERE id = ?
        `,
        [usuario.id],
        erro => {
          if (erro) {
            return reject('Erro ao deletar o usuário');
          }
          return resolve();
        }
      );
    });
  }
};
