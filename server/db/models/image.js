'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate({Place}) {
      this.belongsTo(Place, {foreignKey: 'placeId'});
    }
  }
  Image.init(
    {
      url: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      modelName: 'Image',
    }
  );
  return Image;
};
