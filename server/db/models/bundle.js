'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bundle extends Model {
    static associate({City, User, Bundle_place, Favorite_bundle, Bundle_comment}) {
      this.belongsTo(City, {foreignKey: 'cityId'});
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Bundle_place, {foreignKey: 'placeId'});
      this.hasMany(Favorite_bundle, {foreignKey: 'bundleId'});
      this.hasMany(Bundle_comment, {foreignKey: 'bundleId'});
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
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Bundle',
    }
  );
  return Bundle;
};
