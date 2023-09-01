'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({City, User, Route_place, Favorite_route, Route_comment}) {
      this.belongsTo(City, {foreignKey: 'cityId'});
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Route_place, { foreignKey: 'placeId' });
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
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Route',
    }
  );
  return Route;
};
