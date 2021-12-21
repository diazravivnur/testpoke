"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class poke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      poke.belongsToMany(models.user, {
        through: "user_poke",
        as: "user",
        foreignKey: "pokeId"
      });
    }
  }
  poke.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      height: DataTypes.STRING,
      weight: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "poke"
    }
  );
  return poke;
};
