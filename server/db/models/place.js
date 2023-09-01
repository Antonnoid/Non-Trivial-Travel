'use strict';
const {Model} = require('sequelize');
const route_place = require('./route_place');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate({User, Image, Route_place}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Image, {foreignKey: 'placeId'});
      this.hasMany(Route_place, {foreignKey: 'placeId'});
    }
  }
  Place.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      latitude: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },

      longitude: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'Place',
    }
  );
  return Place;
};
