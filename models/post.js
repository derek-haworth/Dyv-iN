module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('posts', {
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
  });

  Post.associate = function(models) {
    Post.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.belongsTo(models.places, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post; 

};
