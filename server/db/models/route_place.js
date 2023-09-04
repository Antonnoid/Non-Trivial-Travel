'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route_place extends Model {
    static associate({Route, Place}) {
      this.belongsTo(Route, {foreignKey: 'routeId'});
      this.belongsTo(Place, {foreignKey: 'placeId'});
    }
  }
  Route_place.init(
    {
      routeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Routes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      placeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Places',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Route_place',
    }
  );
  return Route_place;
};
