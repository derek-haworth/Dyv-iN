module.exports= function(sequelize, DataTypes) {

	var userProfile = sequelize.define("userProfile", {

		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			isAlpha: true,
			// unique: true, not sure if this is a validator - some documentation online		
			validate: {
				len: [3],
				msg: "Please use letters only. Minimum three characters."
			}			
		},

		userPassword: {
			type: DataTypes.STRING, 
			allowNull: false,
			validate: {
				len: [8],
				msg: "Your password must be at least 8 characters long."
			}			
		},

		livesIn: {
			type: DataTypes.STRING,
			allowNull: false,
			isAlpha: true
			// how do we validate that it's a real city? user input form can have a drop down of US cities?
		}

	});


