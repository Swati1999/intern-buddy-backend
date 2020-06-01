var mongoose = require('mongoose')

var Schema = mongoose.Schema

var OrganizationSchema = new Schema({

    //id:{type: String, required: true, unique: true, index: true},
    organizationName: {type: String, required:true},
    organizationWebsite : {type: String },
    supervisorName: {type: String, required:true},
    supervisorEmail : {type: String, required:true , unique: true},
    supervisorContactNo : {type: String, required:true, max:10},
    organizationAddress : {type: String, required:true},
    organizationCity : {type: String, required:true},
    stipend : {type: Boolean, default: true},
    stipendAmount: {type: Number, default: 0},
    trainingPaid: {type: Boolean, default: false},
    trainingAmount: {type: Number, default:0}
    
})

module.exports = mongoose.model('organization', OrganizationSchema)