'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_route extends Model {
    static associate({User, Route}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Route, {foreignKey: 'routeId'});
    }
  }
  Favorite_route.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      placeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Routes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Favorite_route',
    }
  );
  return Favorite_route;
};
