'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_place extends Model {
    static associate({User, Place}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Place, {foreignKey: 'placeId'});
    }
  }
  Favorite_place.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      placeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Places',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Favorite_place',
    }
  );
  return Favorite_place;
};
