'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({User, Route_place}) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Route_place, { foreignKey: 'placeId' });
    }
  }
  Route.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      time: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.DOUBLE,
      },
      isPublic: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
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
      modelName: 'Route',
    }
  );
  return Route;
};
