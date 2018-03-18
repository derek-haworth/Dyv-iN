module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  }, 
  {
    classMethods: {
      associate: function(models) {
        // We're saying that a Post should belong to an User
        // A Post can't be created without a User due to the foreign key constraint
        Posts.belongsTo(models.Users, {
          foreignkey: {
            allwNull: false
          }
        });
      }
    }
  });
  return Posts;
};
