/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 */

 const { Pool } = require('pg');
 const dotenv = require('dotenv');
 
 dotenv.config();
 
 // ==> Conexão com a Base de Dados:
 const pool = new Pool({
    user: 'postgres',
    password: 'TImbreACH2025',
    connectionString: process.env.DATABASE_URL
 });
 
 pool.on('connect', () => {
   console.log('Base de Dados da TImbre conectado com sucesso!');
 });
 
 module.exports = {
   query: (text, params) => pool.query(text, params),
 };
