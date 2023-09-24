require('dotenv').config()

const { Sequelize } = require('sequelize');

const dbName =process.env.DB_NAME
const dbUserName =process.env.DB_USERNAME
const dbPass =process.env.DB_PASSWORD


const sequelize = new Sequelize(dbName, dbUserName, dbPass, {
    host: 'localhost',
    dialect: 'mysql'
  });


const DBTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos', error);
    }
}


module.exports = {sequelize, DBTest}