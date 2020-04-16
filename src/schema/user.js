var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
    userId: {type: String, required: true, unique: true, index: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type:String, required: true},
    isVerified: {type: Boolean, required: true, default: false},
    verificationToken: {type: String},
    resetPasswordToken: {type: String}
})

module.exports = mongoose.model('user', UserSchema)