'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place_comment extends Model {
    static associate({User, Place}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Place, {foreignKey: 'placeId'});
    }
  }
  Place_comment.init(
    {
      text: {
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
      modelName: 'Place_comment',
    }
  );
  return Place_comment;
};
