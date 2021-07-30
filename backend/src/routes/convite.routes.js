// @ts-nocheck
/**
 * Arquivo: src/routes/convite.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Convite'.
 */

 const router = require('express-promise-router')();
 const inviteController = require('../controllers/convite.controller');
 
 // ==> Definindo as rotas do CRUD - 'Convite':
 
// ==> Rota responsável por listar todos os convites de um usuário: (GET): localhost:3000/api/convite/:idInvite
router.get('/convite/:idInvite', inviteController.listAllInvitesByUser);

// ==> Rota responsável por listar o convite de um usuário pelo id_convite: (GET): localhost:3000/api/:userId/:idInvite
router.get('/convite/:userId/:idInvite', inviteController.findInviteUserById);

module.exports = router;
