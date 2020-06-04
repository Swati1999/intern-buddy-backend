var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AdminSchema = new Schema({
    userId: {type: String, required: true, unique: true, index: true},
    firstName: {type: String},
    middleName: {type: String},
    lastName: {type: String},
    email: {type: String, required:true, unique: true},
    contactNo: {type: String, max:10},
    password: {type: String, required:true}
})

module.exports = mongoose.model('admin', AdminSchema)