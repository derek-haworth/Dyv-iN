module.exports= function(sequelize, DataTypes) {
	var Category = sequelize.define("categories", {
		category_name: {
	    	type: DataTypes.STRING,
	    	allowNull: false,
	    	validation: {
	    		len: [1]
	    	}
	    }
    });

    Category.associate = function(models) {
        // Associating Category with Places
        // When an Category is deleted, also delete any associated Places

        Category.hasMany(models.places, {

          onDelete: "cascade"
        });
    };

    return Category;

};
