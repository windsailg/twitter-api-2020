'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    account: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://cdn.pixabay.com/photo/2020/12/16/10/44/cat-5836297_960_720.jpg'
    },
    introduction: DataTypes.TEXT,
    cover: {
      type: DataTypes.STRING,
      // defaultValue: 'https://gentle-retreat-46560.herokuapp.com/default_img/cover.jpg'
      defaultValue: 'https://cdn.pixabay.com/photo/2020/10/03/14/54/rock-formations-5623735_960_720.jpg'
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  User.associate = function (models) {
    User.hasMany(models.Reply)
    User.hasMany(models.Tweet)
    User.hasMany(models.Like)
    User.belongsToMany(models.User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(models.User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
  }
  return User
}
