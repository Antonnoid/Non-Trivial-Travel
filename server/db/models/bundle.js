'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bundle extends Model {
    static associate({User, Bundle_place}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Bundle_place, {foreignKey: 'placeId'});
    }
  }
  Bundle.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Bundle',
    }
  );
  return Bundle;
};
