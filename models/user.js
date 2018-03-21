var bcrypt = require("bcrypt");

module.exports= function(sequelize, DataTypes) {
	var User = sequelize.define("users", {
		firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        len: [1]
      }
    },
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,	
			validation: {
				len: [1]
			}			
		},
		password: {
			type: DataTypes.STRING, 
			allowNull: false,
			validation: {
				len: [8]
			}			
		}
  });
  
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  
  User.associate = function(models) {
    User.hasMany(models.posts, {
      onDelete: 'CASCADE'
    });

    User.belongsTo(models.places, {
      foreignKey: {
        allowNull: false
      
      }
    })
  };
  return User;
};
