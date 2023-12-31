'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({City, User, Route_place, Favorite_route, Route_comment}) {
      this.belongsTo(City, {foreignKey: 'cityId'});
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Route_place, {foreignKey: 'placeId'});
      this.hasMany(Favorite_route, {foreignKey: 'routeId'});
      this.hasMany(Route_comment, {foreignKey: 'routeId'});
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
        type: DataTypes.TEXT,
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
        onDelete: 'CASCADE',
      },
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Route',
    }
  );
  return Route;
};
