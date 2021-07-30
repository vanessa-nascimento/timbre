const db = require("../config/database");

// ==> Método responsável por listar todos os usuários:
exports.listAllCategories = async (req, res) => {
  const response = await db.query('SELECT * FROM categoria ORDER BY nome ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar um usuário pelo seu id:
exports.findCategoryById = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM categoria WHERE id_categoria = $1', [categoryId]);
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar um usuário pelo seu id:
exports.findEventsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM evento_categoria WHERE id_categoria = $1', [categoryId]);
  res.status(200).send(response.rows);
};
