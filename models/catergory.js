module.exports= function(sequelize, DataTypes) {

	var Category = sequelize.define("Category", {

		restaurant: {
			type: DataTypes.STRING	
						
		},
        
        museum: {
            type: DataTypes.STRING, 
            				
		},
        
        shop: {
			type: DataTypes.STRING,
			
        },

        bar: {
            type: DataTypes.STRING,

        },



        


    });
    return Category;

};
