/**
 * Arquivo: app.js
 * Descrição: arquivo responsável por toda a configuração da aplicação.
 */

 const express = require('express');
 const cors = require('cors');
 
 const app = express();
 
 // ==> Rotas da API:
 const index = require('./routes/index');
 const userRoute = require('./routes/usuario.routes');
 const eventsRoute = require('./routes/evento.routes');
 const modelUser = require('./models/user');
 const authUser = require('./auth/auth');
 
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
 app.use(express.json({ type: 'application/vnd.api+json' }));
 app.use(cors());
 
 app.use(index);
 app.use('/api/', userRoute);
 app.use('/api/', eventsRoute);
 app.use(express.json())
 app.use(express.urlencoded({ extended: true}))
 
 module.exports = app;
 