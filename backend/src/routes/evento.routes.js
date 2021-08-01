// @ts-nocheck
/**
 * Arquivo: src/routes/evento.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Evento'.
 */

 const router = require('express-promise-router')();
 const eventController = require('../controllers/evento.controller');
 
 // ==> Definindo as rotas do CRUD - 'Evento':
 
 // ==> Rota responsável por criar um novo evento: (POST): localhost:3000/api/criar-evento
 router.post('/criar-evento', eventController.createEvent);
 
// ==> Rota responsável por listar todos os eventos: (GET): localhost:3000/api/eventos
router.get('/eventos/', eventController.listAllEvents);

// ==> Rota responsável por listar o evento pelo seu cod_evento: (GET): localhost:3000/api/eventos/:id
router.get('/eventos/token/:id/', eventController.findEventByToken);

// ==> Rota responsável por listar o evento pelo id do organizador (GET): localhost:3000/api/eventos/:id
router.get('/eventos/organizador/', eventController.findEventsById);


// ==> Rota responsável por listar o evento pelo id do organizador (GET): localhost:3000/api/eventos/:id
router.get('/eventos/usuario/', eventController.findEventsUser);

// ==> Rota responsável por trocar dados de um evento: (PUT): localhost:3000/api/eventos/:id
router.put('/eventos/:id', eventController.updateEventById);

module.exports = router;
