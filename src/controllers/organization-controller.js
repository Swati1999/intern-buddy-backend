const uuid = require('uuid/v4');
const HttpError = require("../schema/http-error");
const {validationResult} = require('express-validator');
const Organization = require('../schema/organization')

let DUMMY_ORGANIZATIONS = [{

    id: "o1",
    organizationName: "Air India",
    organizationWebsite : "www.airindia.com",
    supervisorName: "Ritesh Kumar",
    supervisorEmail : "ritesh1234@gmail.com",
    supervisorContactNo : "9876987699",
    organizationAddress : "krishna nagar",
    organizationCity : "Delhi",
    stipend : true,
    stipendAmount: 10000,
    trainingPaid: false,
    trainingAmount: 0

}];

//get all organizations
const getOrganizations = async(req, res, next) =>{

    let organization;
    try{
        organization = await Organization.find();

    }catch(err){
        const error = new HttpError('Something went wrong, could not find an organization.',500);
        return next(error); 
    }

    res.json({organization});
}

//view organization by ID
const getOrganizationById = async(req, res,next) =>{
    const organizationId = req.params.oid;

    let organization;
    try{
        organization = await Organization.findById(organizationId);

    }catch(err){
        const error = new HttpError('Something went wrong, could not find an organization.',500);
        return next(error); 
    }
    if(!organization){
        const error= new HttpError('could not find an organization for the provide id',404);
        return next(error)
    }

    res.json({ organization: organization.toObject({ getters: true }) }); // => { organization } => { organization: organization }
    
};

//creating organization
const createOrganization = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { organizationName, organizationWebsite ,supervisorName, supervisorEmail, supervisorContactNo, organizationAddress ,organizationCity ,stipend, stipendAmount, trainingPaid, trainingAmount}  = req.body;

    const createdOrganization = new Organization({
       // id: uuid(),
        organizationName,
        organizationWebsite,
        supervisorName, 
        supervisorEmail, 
        supervisorContactNo, 
        organizationAddress,
        organizationCity, 
        stipend, 
        stipendAmount,
        trainingPaid, 
        trainingAmount
    });

    try {
        await createdOrganization.save();
      } catch (err) {

        console.log(err)
        const error = new HttpError(
          'Creating organization failed, please try again.',
          500
        );
        return next(error);
      }
    res.status(201).json({organization: createdOrganization});
};

//Update organization by ID
const updateOrganization = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { organizationWebsite ,supervisorName, supervisorEmail, supervisorContactNo, organizationAddress ,organizationCity ,stipend, stipendAmount, trainingPaid, trainingAmount }  = req.body;
    const organizationId = req.params.oid;

    let organization;
    try{
        organization = await Organization.findById(organizationId);
    }catch(err){
        const error = new HttpError('Something went wrong, please check again');
        return next(error);
    }
    organization.organizationWebsite = organizationWebsite;
    organization.supervisorName = supervisorName;
    organization.supervisorEmail = supervisorEmail;
    organization.supervisorContactNo = supervisorContactNo;
    organization.organizationAddress = organizationAddress;
    organization.organizationCity = organizationCity;
    organization.stipend = stipend;
    organization.stipendAmount = stipendAmount;
    organization.trainingPaid = trainingPaid;
    organization.trainingAmount = trainingAmount;

    try {
        await organization.save();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not update organization.',
          500
        );
        return next(error);
      }
    
      res.status(200).json({ organization: organization.toObject({ getters: true }) });

};

//delete organization by ID
const deleteOrganization = async(req, res, next) =>{
    const organizationId = req.params.oid;
    let organization;
    try {
        organization = await Organization.findById(organizationId);
    } catch (err) {
        const error = new HttpError( 'Something went wrong, could not delete organization.',500);
        return next(error);
    }

    try {
        await organization.remove();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete organization.',500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted organization'})
};

exports.getOrganizations = getOrganizations;
exports.getOrganizationById = getOrganizationById;
exports.createOrganization = createOrganization;
exports.updateOrganization = updateOrganization;
exports.deleteOrganization = deleteOrganization;
