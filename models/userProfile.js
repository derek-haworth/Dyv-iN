var bcrypt = require("bcrypt-nodejs");

module.exports= function(sequelize, DataTypes) {

	var User = sequelize.define("User", {

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			isAlpha: true,
			unique: true,	
			validate: {
				len: [3]
				
			}			
		},

		password: {
			type: DataTypes.STRING, 
			allowNull: false,
			validate: {
				len: [8]
			}			
		},

		city: {
			type: DataTypes.STRING,
			isAlpha: true
		}

    });
    
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

    User.associate = function(models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.Post, {
          onDelete: "cascade"
        });
      };
      
      return User;

};
