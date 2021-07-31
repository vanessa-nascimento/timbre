/**
 * Arquivo: server.js
 * Descrição: arquivo responsável por toda a configuração e execução da aplicação.
 */

 const app = require('./src/app');

 const port = process.env.PORT || 8080;
 
 app.listen(port, () => {
   console.log('Aplicação executando na porta ', port);
 });
