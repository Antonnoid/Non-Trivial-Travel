'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      City,
      Place,
      Route,
      Bundle,
      Favorite_place,
      Favorite_route,
      Favorite_bundle,
      Place_comment,
      Route_comment,
      Bundle_comment,
    }) {
      this.belongsTo(City, {foreignKey: 'cityId'});
      this.hasMany(Place, {foreignKey: 'userId'});
      this.hasMany(Route, {foreignKey: 'userId'});
      this.hasMany(Bundle, {foreignKey: 'userId'});
      this.hasMany(Favorite_place, {foreignKey: 'routeId'});
      this.hasMany(Favorite_route, {foreignKey: 'routeId'});
      this.hasMany(Favorite_bundle, {foreignKey: 'routeId'});
      this.hasMany(Place_comment, {foreignKey: 'userId'});
      this.hasMany(Route_comment, {foreignKey: 'userId'});
      this.hasMany(Bundle_comment, {foreignKey: 'userId'});
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      cityId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      isAdmin: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
