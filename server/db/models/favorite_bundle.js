'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_bundle extends Model {
    static associate({User, Bundle}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Bundle, {foreignKey: 'bundleId'});
    }
  }
  Favorite_bundle.init(
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
      bundleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bundles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Favorite_bundle',
    }
  );
  return Favorite_bundle;
};
