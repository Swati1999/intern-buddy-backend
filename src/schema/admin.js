var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AdminSchema = new Schema({
    userId: {type: String, required:true},
    firstName: {type: String, required:true},
    middleName: {type: String},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    contactNo: {type: String, required:true, max:10},
    password: {type: String, required:true}
})

module.exports = mongoose.model('admin', AdminSchema)