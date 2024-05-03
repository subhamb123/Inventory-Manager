const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static async findUser(username, password){
    try {
      const user = await User.findByPk(username)
      if(user && user.password === password) {
        return user
      }
      else {
        return null
      }
    } 
    catch (error) {
      console.log(error)
      return null
    }
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'USER',
  freezeTableName: true,
  timestamps: false
});

module.exports = User