'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate({
      City,
      User,
      Image,
      Route_place,
      Bundle_place,
      Favorite_place,
      Place_comment,
    }) {
      this.belongsTo(City, {foreignKey: 'cityId'});
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Image, {foreignKey: 'placeId'});
      this.hasMany(Route_place, {foreignKey: 'placeId'});
      this.hasMany(Bundle_place, {foreignKey: 'placeId'});
      this.hasMany(Favorite_place, {foreignKey: 'placeId'});
      this.hasMany(Place_comment, {foreignKey: 'placeId'});
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
