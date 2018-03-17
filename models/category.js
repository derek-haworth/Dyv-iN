module.exports= function(sequelize, DataTypes) {

	var Category = sequelize.define("Category", {

		restaurant: {
			type: DataTypes.STRING	
						
		},
        
        museum: {
            type: DataTypes.STRING
            				
		},
        
        shop: {
			type: DataTypes.STRING
			
        },

        bar: {
            type: DataTypes.STRING

        },       


    });

    Category.associate = function(models) {
        // Associating Category with Places
        // When an Category is deleted, also delete any associated Places
        Category.hasMany(models.Place, {
          onDelete: "cascade"
        });
      };

    return Category;

};
