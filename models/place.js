module.exports= function(sequelize, DataTypes) {

	var Place = sequelize.define("places", {
		name: {
			type: DataTypes.STRING,
            allowNull: false			
		},
        address: {
            type: DataTypes.STRING
		},      
        review: {
            type: DataTypes.TEXT,
            allowNull: false
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
