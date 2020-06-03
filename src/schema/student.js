var mongoose = require('mongoose')

var Schema = mongoose.Schema

var StudentSchema = new Schema({
    //id: {type: String, required:true, unique: true, index: true},
    password: {type: String },
    isVerified: {type: Boolean, required: true, default: false},
    resetPasswordToken: {type: String},

    //personal details
    firstName: {type: String, required:true},
    middleName: {type: String},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    contactNo: {type: String, max:10},
    address: {type: String },
    fathersName: {type: String },
    mothersName: {type: String},

    //Acedemic details
    class10percentage: {type: Number, required: true},
    class12percentage: {type: Number, required: true},
    gpaSem1: {type: Number, default:0},
    gpaSem2: {type: Number, default:0},
    gpaSem3: {type: Number, default:0},
    gpaSem4: {type: Number, default:0},
    gpaSem5: {type: Number, default:0},
    gpaSem6: {type: Number, default:0},
    CGPA: {type: Number, default:10},

})
module.exports = mongoose.model('student', StudentSchema)