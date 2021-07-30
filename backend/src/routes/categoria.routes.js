// @ts-nocheck
/**
 * Arquivo: src/routes/categoria.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Categoria'.
 */

 const router = require('express-promise-router')();
 const categoryController = require('../controllers/categoria.controller');
 
 // ==> Definindo as rotas do CRUD - 'Categoria':
 
// ==> Rota responsável por listar todos os eventos: (GET): localhost:3000/api/categorias
router.get('/categorias/', categoryController.listAllCategories);

// ==> Rota responsável por listar o evento pelo seu cod_evento: (GET): localhost:3000/api/categorias/:id
router.get('/categorias/:id', categoryController.findCategoryById);

// ==> Rota responsável por listar o evento pelo id do organizador (GET): localhost:3000/api/categorias/eventos
router.get('/categorias/eventos', categoryController.findEventsByCategory);

module.exports = router;
