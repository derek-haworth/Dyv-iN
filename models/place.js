module.exports = function(sequelize, DataTypes) {

	var Place = sequelize.define("places", {
		name: {
			type: DataTypes.STRING,
            allowNull: false			

		},
        address: {
            type: DataTypes.STRING
		},
        viewable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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

        Place.belongsTo(models.cities, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Place;

};
