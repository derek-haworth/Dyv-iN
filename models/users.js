var bcrypt = require("bcrypt-nodejs");

module.exports= function(sequelize, DataTypes) {
	var Users = sequelize.define("Users", {
		firstName: DataTypes.STRING,
    	lastName: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,	
			validate: {
				isEmail: true	
			}			
		},
		password: {
			type: DataTypes.STRING, 
			allowNull: false,
			validate: {
				len: [8]
			}			
		}
    }, 
    {
    	classMethodss: {
    		associate: function(models) {
    			Users.hasMany(models.post, {
    				onDelete: "cascade"
    			});
    		}
    	},
    	instanceMethods: {
    		generateHash: function(password) {
		    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		    },
		    validPassword: function(password) {
		    	return bcrypt.compareSync(password, this.password);
		    },
    	}
    });
    
    Users.hook('beforeCreate', function(user, options) {
    	user.password = user.generateHash(user.password);
  	});
      
    return Users;
};
