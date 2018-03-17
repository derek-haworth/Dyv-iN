module.exports= function(sequelize, DataTypes) {

	var Place = sequelize.define("Place", {

		name: {
			type: DataTypes.STRING	
						
		},
        
        address: {
            type: DataTypes.STRING
            				
		},
        
        category: {
			type: DataTypes.STRING
			
        },

        comparedTo: {
            type: DataTypes.STRING

        },  
        
        review: {
            type: DataTypes.TEXT
        }


    });

    Place.associate = function(models) {
        
        Place.hasOne(models.Category, {
            foreignKey: {
                allowNull: false
              }
        });
      };

    return Place;

};
