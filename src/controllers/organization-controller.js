const uuid = require('uuid/v4');
const HttpError = require("../schema/http-error");
const {validationResult} = require('express-validator');

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
const getOrganizations = (req, res, next) =>{
    res.json({organizations: DUMMY_ORGANIZATIONS });
}

//view organization by ID
const getOrganizationById = (req, res,next) =>{
    const organizationId = req.params.oid;
    const organization = DUMMY_ORGANIZATIONS.find(o=>{
        return o.id === organizationId;
    });
    if(!organization){
        throw new HttpError('could not find a organization for the provide id',404);
    }

   res.json({organization});
    
};

//creating organization
const createOrganization = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { organizationName, organizationWebsite ,supervisorName, supervisorEmail, supervisorContactNo, organizationAddress ,organizationCity ,stipend, stipendAmount, trainingPaid, trainingAmount}  = req.body;

    const createdOrganization ={
        id: uuid(),
        organizationName,
        organizationWebsite,
        supervisorName, 
        supervisorEmail, 
        supervisorContactNo, 
        organizationAddress, 
        organizationCity, 
        stipend, stipendAmount,
        trainingPaid, 
        trainingAmount
       
    };
    DUMMY_ORGANIZATIONS.push(createdOrganization);
    res.status(201).json({organization: createdOrganization});
};

//Update organization by ID
const updateOrganization = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { organizationWebsite ,supervisorName, supervisorEmail, supervisorContactNo, organizationAddress ,organizationCity ,stipend, stipendAmount, trainingPaid, trainingAmount }  = req.body;
    const organizationId = req.params.oid;

    const updatedOrganization = {...DUMMY_ORGANIZATIONS.find(o=> o.id===organizationId )};
    const organizationIndex = DUMMY_ORGANIZATIONS.findIndex(o=> o.id===organizationId );

    updatedOrganization.organizationWebsite = organizationWebsite;
    updatedOrganization.supervisorName = supervisorName;
    updatedOrganization.supervisorEmail = supervisorEmail;
    updatedOrganization.supervisorContactNo = supervisorContactNo;
    updatedOrganization.organizationAddress = organizationAddress;
    updatedOrganization.organizationCity = organizationCity;
    updatedOrganization.stipend = stipend;
    updatedOrganization.stipendAmount = stipendAmount;
    updatedOrganization.trainingPaid = trainingPaid;
    updatedOrganization.trainingAmount = trainingAmount;

    DUMMY_ORGANIZATIONS[organizationIndex] = updatedOrganization;
    res.status(200).json({organization: updatedOrganization});

};

//delete organization by ID
const deleteOrganization = (req, res, next) =>{
    const organizationId = req.params.oid;
    if(!DUMMY_ORGANIZATIONS.find(o =>o.id==organizationId)){
        throw new HttpError('Could not find a organization for that id', 404);
    }
    DUMMY_ORGANIZATIONS = DUMMY_ORGANIZATIONS.filter(o => o.id !== organizationId);
    res.status(200).json({ message: 'Deleted organization'})
};

exports.getOrganizations = getOrganizations;
exports.getOrganizationById = getOrganizationById;
exports.createOrganization = createOrganization;
exports.updateOrganization = updateOrganization;
exports.deleteOrganization = deleteOrganization;