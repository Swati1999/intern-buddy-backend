var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PersonalDetails = new Schema({
    firstName: {type: String, required:true},
    middleName: {type: String},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    contactNo: {type: String, required:true, max:10},
    address: {type: String, required:true},
    fathersName: {type: String, required:true},
    mothersName: {type: String, required:true},
    dateOfBirth:{type:Date, required:true}

})

var ClassDetailsSchema = new Schema({
    maxMarks: {type: Number, required: true},
    obtainedMarks: {type: Number, required: true},
    percentage: {type: Number, required: true},
    yearOfPassing: {type: Number, required: true},
    board: {type: String, required: true}
})

var CollegeDetailsSchema = new Schema({
    maxGPA: {type: Number, default:10},
    gpaSem1: {type: Number, default:0},
    gpaSem2: {type: Number, default:0},
    gpaSem3: {type: Number, default:0},
    gpaSem4: {type: Number, default:0},
    gpaSem5: {type: Number, default:0},
    gpaSem6: {type: Number, default:0},
    gpaSem7: {type: Number, default:0},
    gpaSem8: {type: Number, default:0},
})

var AcedemicDetailsSchema = new Schema({
    class10: ClassDetailsSchema,
    class12: ClassDetailsSchema,
    college: CollegeDetailsSechema

})


var StudentSchema = new Schema({
    userId: {type: String, required:true},
    password: {type: String, required:true},
    personalDetails: PersonalDetails,
    acedemicDetails: AcedemicDetailsSchema
})





module.exports = mongoose.model('student', StudentSchema)