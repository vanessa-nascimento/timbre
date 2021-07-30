const db = require("../config/database");

// ==> Método responsável por listar todos os convites de um usuario:
exports.listAllInvitesByUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM convite WHERE id_usuario = $1', [userId]);
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar um convite de um usuario pelo seu id:
exports.findInviteUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const categoryId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM convite WHERE id_convite = $1 AND id_usuario = $2', [categoryId, userId]);
  res.status(200).send(response.rows);
};
