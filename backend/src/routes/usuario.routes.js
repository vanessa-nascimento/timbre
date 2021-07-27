// @ts-nocheck
/**
 * Arquivo: src/routes/usuario.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Usuario'.
 */

 const router = require('express-promise-router')();
 const userController = require('../controllers/usuario.controller');
 
 // ==> Definindo as rotas do CRUD - 'Usuario':
 
 // ==> Rota responsável por criar um novo usuario: (POST): localhost:3000/api/cadastro
 router.post('/cadastro', userController.createUser);
 
// ==> Rota responsável por listar todos os usuarios: (GET): localhost:3000/api/usuarios
router.get('/usuarios/', userController.listAllUsers);

// ==> Rota responsável por listar o usuario pelo seu id: (GET): localhost:3000/api/usuarios/:id
router.get('/usuarios/:id', userController.findUserById);

// ==> Rota responsável por trocar dados de um usuario: (PUT): localhost:3000/api/usuarios/:id
router.get('/usuarios/:id', userController.updateUserById);

 module.exports = router;
