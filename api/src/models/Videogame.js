const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // ID alfanumerico autoincrementable
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    // created:{ //asi puedo filtrar por creados
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    //   allowNull: true 
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false // El false, le impide que el campo este vacio
    },
    img:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released_date: {
      type: DataTypes.DATE       //allowNull: true-->  viene por default
    },
    rating: {
      type: DataTypes.DECIMAL
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },{
    timestamps: false
  });
}