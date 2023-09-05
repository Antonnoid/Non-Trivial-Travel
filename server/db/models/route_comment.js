'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route_comment extends Model {
    static associate({User, Route}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Route, {foreignKey: 'routeId'});
    }
  }
  Route_comment.init(
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
        onDelete: 'CASCADE',
      },
      routeId: {
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
      modelName: 'Route_comment',
    }
  );
  return Route_comment;
};
