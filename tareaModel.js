const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js')

const Tarea = sequelize.define('Tarea', {
    fecha: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING      
    },
    titulo: {
      type: DataTypes.STRING      
    },
    post: {
      type: DataTypes.STRING  
    },
    imagen: {
      type: DataTypes.STRING      
    },
  }, {
    timestamps: false,
    tableName: 'datos'
  });

  module.exports = Tarea;