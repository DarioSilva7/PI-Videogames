const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      api_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 999999,
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://www.elsoldepuebla.com.mx/gossip/jp9j3s-el-espectaculo-de-super-mario-bros-se-presentara-en-puebla-te-decimos-cuando/alternates/LANDSCAPE_768/El%20espect%C3%A1culo%20de%20Super%20Mario%20Bros%20se%20presentar%C3%A1%20en%20Puebla,%20te%20decimos%20cu%C3%A1ndo",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      released_date: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      timestamps: false,
    }
  );
};
