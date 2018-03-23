module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("cities", {
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  City.associate = function(models) {
    City.belongsToMany(models.places , {
      through: 'CityLikes'
    });
  };

  return City;
};
