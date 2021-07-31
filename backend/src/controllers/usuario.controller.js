const db = require("../config/database");

// ==> Método responsável por criar um novo Usuario:
exports.createUser = async (req, res) => {
  const { cpf, nome, email, senha, data_nascimento } = req.body;
  const response = await db.query(
    "INSERT INTO usuario (cpf, nome, email, senha, data_nascimento) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5)",
    [cpf, nome, email, senha, data_nascimento],
  );

  res.status(201).send({
    message: "Usuario adicionado com sucesso!",
    body: {
      usuario: { cpf, nome, email, senha, data_nascimento }
    },
  });
};

// ==> Método responsável por logar um Usuario:
exports.loginUser = async (req, res) => {
  res.status(204).send();
}


//   if(response) {
//     const id = await db.query(
//       "SELECT id FROM usuario WHERE email=$1 AND senha=$2", [email, senha],
//     );

//     const token = jwt.sign({ id }, process.env.SECRET, {
//       expiresIn: 1200 // expires in 5min
//     });
//     return res.json({ auth: true, token: token });
//   }
  
//   res.status(500).json({message: 'Login inválido!'});

// };

// // ==> Método responsável por deslogar um Usuario:
// exports.logoutUser = async (req, res) => {
//   res.json({ auth: false, token: null });
// };


// ==> Método responsável por listar todos os usuários:
exports.listAllUsers = async (req, res) => {
  const response = await db.query('SELECT * FROM usuario ORDER BY nome ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar um usuário pelo seu id:
exports.findUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM usuario WHERE id = $1', [userId]);
  res.status(200).send(response.rows);
};

// ==> Método responsável por alterar dados do usuario:
exports.updateUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { nome, email, senha, data_nascimento } = req.body;
  
  const response = await db.query(
    "UPDATE usuario SET nome = $1, email = $2, senha = $3, data_nascimento = $4 WHERE productId = $5",
    [nome, email, senha, data_nascimento, userId],
  );

  res.status(201).send({ message: "Usuario atualizado com sucesso!" });
};
