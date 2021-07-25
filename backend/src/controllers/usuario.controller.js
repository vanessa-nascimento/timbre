const db = require("../config/database");

// ==> Método responsável por criar um novo Usuario:

exports.createUser = async (req, res) => {
  const { cpf, nome, email, senha, data_nascimento } = req.body;
  const response = await db.query(
    "INSERT INTO usuario (cpf, nome, email, senha, data_nascimento) VALUES ($1, $2, $3, $4, $5)",
    [cpf, nome, email, senha, data_nascimento],
  );

  res.status(201).send({
    message: "Usuario adicionado com sucesso!",
    body: {
      usuario: { cpf, nome, email, senha, data_nascimento }
    },
  });
};

// ==> Método responsável por listar todos os usuários:
exports.listAllUsers = async (req, res) => {
  const response = await db.query('SELECT * FROM usuario ORDER BY nome ASC');
  res.status(200).send(response.rows);
};
