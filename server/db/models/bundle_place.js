'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bundle_place extends Model {
    static associate({Bundle, Place}) {
      this.belongsTo(Bundle, {foreignKey: 'bundleId'});
      this.belongsTo(Place, {foreignKey: 'placeId'});
    }
  }
  Bundle_place.init(
    {
      bundleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bundles',
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
      modelName: 'Bundle_place',
    }
  );
  return Bundle_place;
};
