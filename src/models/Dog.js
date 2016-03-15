var mongoose = require('mongoose');

var DogModel;

//A DB Schema to define our data structure
//The schema really just defines a DB data structure. 
//In this case it also defines what functions/methods will be attached to objects that come 
//back from the database. 
//Schemas also add constraints to the fields so that you can enforce that objects have fields of the right type
//This should always be done since it ensures your variables will be the right type and 
//it helps prevent injection of invalid data
//Schemas are made in JSON.
//The name of the field will be the variable name for each object
//The json of each field are the constraints around it
//There are many constraints available 
//For example, 
//type is the data type (String, Number, Date, Boolean, etc).
//required is whether or not the field is required to allow a document to be created
//trim is whether or not the field should strip spaces before and after value
//unique is whether or not the field must be a unique value (meaning no two Cat object can have the same value for that field)
//min is the minimum numeric value
//max is the maximum numeric value
//default is the default value if one is not provided
//match is the format to match done through regex
var DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    
    breed: {
        type: String,
		required: true,
        trim: true
    },
    age: {
		type: Number,
		min: 0,
		default: 0
	},
    createdDate: {
        type: Date,
        default: Date.now
    }

});

DogSchema.methods.sayName = function() {
    console.log(this.name);
};

DogSchema.statics.findByName = function(name, callback) {

    var search = {
        name: name,
    };

    return DogModel.findOne(search, callback);
};

DogModel = mongoose.model('Dog', DogSchema);

module.exports.DogModel = DogModel;
module.exports.DogSchema = DogSchema;