'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bundle_comment extends Model {
    static associate({User, Bundle}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Bundle, {foreignKey: 'bundleId'});
    }
  }
  Bundle_comment.init(
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
      bundleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bundles',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Bundle_comment',
    }
  );
  return Bundle_comment;
};
