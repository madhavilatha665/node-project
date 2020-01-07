var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({

    username:{
        type:String
    },

    emailId:{
        type:String
    },
    password:{
        type:String
    },
    mobilenumber:{
        type:Number
    }

});


var User = module.exports = mongoose.model('User',UserSchema);
