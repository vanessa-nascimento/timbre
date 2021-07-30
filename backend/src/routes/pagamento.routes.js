// @ts-nocheck
/**
 * Arquivo: src/routes/evento.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Evento'.
 */

 const router = require('express-promise-router')();
 const eventController = require('../controllers/evento.controller');
 
 // ==> Definindo as rotas do CRUD - 'Evento':
 
 // ==> Rota responsável por criar um novo evento: (POST): localhost:3000/api/criar-evento
 router.post('/pagamento', eventController.createPayment);
 
// ==> Rota responsável por listar todos os eventos: (GET): localhost:3000/api/eventos
router.get('/pagamentos/', eventController.listAllPayments);

module.exports = router;
