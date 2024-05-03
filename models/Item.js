const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Item extends Model {
  static async findID(id){
    try {
        const item = await Item.findByPk(id)
        return item ? item : null;
    } catch (error) {
        console.log(error)
        return null
    }
}
}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alert: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'ITEM',
  freezeTableName: true,
  timestamps: false
});

module.exports = Item