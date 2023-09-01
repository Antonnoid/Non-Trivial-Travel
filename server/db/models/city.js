'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate({User, Place, Route, Bundle}) {
      this.hasMany(User, {foreignKey: 'cityId'});
      this.hasMany(Place, {foreignKey: 'cityId'});
      this.hasMany(Route, {foreignKey: 'cityId'});
      this.hasMany(Bundle, {foreignKey: 'cityId'});
    }
  }
  City.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'City',
    }
  );
  return City;
};
