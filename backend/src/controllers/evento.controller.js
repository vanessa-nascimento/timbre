const db = require("../config/database");

// ==> Método responsável por criar um novo evento:

exports.createEvent = async (req, res) => {
  const { nome, descricao, capacidade_min, capacidade_max, longitude, latitude, preco, data_inicio, data_fim, qt_convite, e_publico } = req.body;
  const response = await db.query(
    "INSERT INTO evento (nome, descricao, capacidade_min, capacidade_max, longitude, latitude, preco, data_inicio, data_fim, qt_convite, e_publico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    [nome, descricao, capacidade_min, capacidade_max, longitude, latitude, preco, data_inicio, data_fim, qt_convite, e_publico],
  );

  res.status(201).send({
    message: "Evento adicionado com sucesso!",
    body: {
      evento: { nome, descricao, capacidade_min, capacidade_max, longitude, latitude, preco, data_inicio, data_fim, qt_convite, e_publico }
    },
  });
};

// ==> Método responsável por listar todos os eventos:
exports.listAllEvents = async (req, res) => {
  const response = await db.query("SELECT * FROM evento WHERE e_publico='0' ORDER BY nome ASC");
  res.status(200).send(response.rows);
};


// ==> Método responsável por listar todos os eventos pelo id do organizador:
exports.findEventsById = async (req, res) => {
  const response = await db.query('SELECT * FROM evento WHERE id_organizador = 5');
  res.status(200).send(response.rows);
};


// ==> Método responsável por listar o evento pelo cod)_evento:
exports.findEventByToken = async (req, res) => {
  const codEvento = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM evento WHERE cod_evento = $1', [codEvento]);
  res.status(200).send(response.rows);
};

// ==> Método responsável por listar o evento pelo cod)_evento:
exports.findEventsUser = async (req, res) => {
  const response = await db.query('SELECT * FROM convite , evento , usuario WHERE c.id_usuario = 5');
  res.status(200).send(response.rows);
};


// ==> Método responsável por alterar dados do usuario:
exports.updateEventById = async (req, res) => {
  const {codEvento} = parseInt(req.params.id);
  
  const response = await db.query(
    "UPDATE evento SET nome = $1, descricao = $2, capacidade_min = $3, capacidade_max = $4, longitude = $5, latitude = $6, preco = $7, data_inicio = $8, data_fim = $9, qt_convite = $10, e_publico = $11 WHERE cod_evento = $12",
    [nome, descricao, capacidade_min, capacidade_max, longitude, latitude, preco, data_inicio, data_fim, qt_convite, e_publico, codEvento],
  );

  res.status(201).send({ message: "Evento atualizado com sucesso!" });
};

