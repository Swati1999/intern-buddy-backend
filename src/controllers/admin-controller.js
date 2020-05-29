const uuid = require('uuid/v4');
const HttpError = require("../schema/http-error");
const {validationResult} = require('express-validator');

let DUMMY_ADMINS = [{
    id: 'a1',
    firstName: 'kusum',
    middleName: 'kumari',
    lastName: 'gupta',
    email: 'kusum1234@gmail.com',
    contactNo: '9898989898',
    password: 'kusum'
}];

//get all admins
const getAdmins = (req, res, next) =>{
    res.json({admins: DUMMY_ADMINS });
}

//view admins by ID
const getAdminById = (req, res,next) =>{
    const adminId = req.params.aid;
    const admin = DUMMY_ADMINS.find(a=>{
        return a.id === adminId;
    });
    if(!admin){
        throw new HttpError('could not find a admin for the provide id',404);
    }

   res.json({admin});

};

//Update admin by ID
const updateAdmin = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { email, contactNo, password }  = req.body;
    const adminId = req.params.aid;

    const updatedAdmin = {...DUMMY_ADMINS.find(a=> a.id===adminId )};
    const adminIndex = DUMMY_ADMINS.findIndex(a=> a.id===adminId );

    updatedAdmin.email = email;
    updatedAdmin.contactNo = contactNo;
    updatedAdmin.password = password;

    DUMMY_ADMINS[adminIndex] = updatedAdmin;
    res.status(200).json({admin: updatedAdmin});

};

//delete admin by ID
const deleteAdmin = (req, res, next) =>{
    const adminId = req.params.aid;
    if(!DUMMY_ADMINS.find(a =>a.id==adminId)){
        throw new HttpError('Could not find a admin for that id', 404);
    }
    DUMMY_ADMINS = DUMMY_ADMINS.filter(a => a.id !== adminId);
    res.status(200).json({ message: 'Deleted Admin '})
};


exports.getAdmins = getAdmins;
exports.getAdminById = getAdminById;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
