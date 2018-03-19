module.exports= function(sequelize, DataTypes) {

	var Place = sequelize.define("places", {
		name: {
			type: DataTypes.STRING				
		},
        address: {
            type: DataTypes.STRING
		},      
        review: {
            type: DataTypes.TEXT
        }
    });

    Place.associate = function(models) {
      	Place.belongsTo(models.categories, {
        	foreignKey: {
            	allowNull: false
            }
      	});
        Place.hasMany(models.posts, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Place;

};
