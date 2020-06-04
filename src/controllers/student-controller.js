const uuid = require('uuid/v4');
const HttpError = require("../schema/http-error");
const {validationResult} = require('express-validator');
const Student = require('../schema/student')

let DUMMY_STUDENTS = [{
   // id: 's1',
    password: 'swati',
    isVerified: false,
    resetPasswordToken: "hello",

    firstName: 'rekha',
    middleName: 'kumari',
    lastName: 'Bansal',
    email: "rekha1234@gmail.com",
    contactNo: "9876598765",
    address: "Gandhi Nagar",
    fathersName: "Sulekh Bansal",
    mothersName: "Poorvi Bansal",

    class10percentage: 90,
    class12percentage: 90,
    gpaSem1: 9,
    gpaSem2: 9,
    gpaSem3: 9,
    gpaSem4: 9,
    gpaSem5: 9,
    gpaSem6: 9,
    CGPA: 9,
}];

//get all students
const getStudents = async (req, res, next) =>{
    try {
        students = await Student.find()
        res.json({students})
    }
    catch(err) {
        console.log(err)
    }
}

//view students by ID
const getStudentById = async(req, res,next) =>{
    const studentId = req.params.sid;
    let student;
    try{
        student = await Student.findById(studentId);

    }catch(err){
       const error = new HttpError('Something went wrong, could not find an student.',500);
        return next(error); 
    }
    if(!student){
        const error= new HttpError('could not find an student for the provide id',404);
        return next(error)
    }

    res.json({ student: student.toObject({ getters: true }) }); // => { student } => { student: student }
    
};


//creating student
const createStudent = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const {password, firstName, lastName,email, contactNo, userId }  = req.body;

    const createdStudent = new Student({
        password,
        firstName,
        lastName,
        email,
        contactNo,
        userId
    });

    try {
        await createdStudent.save();
      } catch (err) {

        console.log(err)
        const error = new HttpError('Creating student failed, please try again.', 500 );
        return next(error);
      }
    res.status(201).json({student: createdStudent});
};



//Update students personal info by ID
const updateStudentPersonalDetails = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const {password, firstName,middleName,lastName,email,contactNo,address,fathersName,mothersName }  = req.body;
    const studentId = req.params.sid;
    let student;
    try{
        student = await Student.findById(studentId);
    }catch(err){
        const error = new HttpError('Something went wrong, please check again');
        return next(error);
    }
    student.password = password;
    student.firstName = firstName;
    student.middleName = middleName;
    student.lastName =lastName;
    student.email =email;
    student.contactNo =contactNo;
    student.address = address;
    student.fathersName =fathersName;
    student.mothersName =mothersName; 

    try {
        await student.save();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not update student.',
          500
        );
        return next(error);
      }
   
      res.status(200).json({ student: student.toObject({ getters: true }) });


};
//Update student academic info by ID
const updateStudentAcademicDetails = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { class10percentage,class12percentage,gpaSem1,gpaSem2,gpaSem3,gpaSem4, gpaSem5, gpaSem6, CGPA }  = req.body;
    const studentId = req.params.sid;
 
    let student;
    try{
        student = await Student.findById(studentId);
    }catch(err){
        const error = new HttpError('Something went wrong, please check again');
        return next(error);
    }
    student.class10percentage = class10percentage;
    student.class12percentage = class12percentage;
    student.gpaSem1 = gpaSem1;
    student.gpaSem2 =gpaSem2;
    student.gpaSem3 =gpaSem3;
    student.gpaSem4 =gpaSem4;
    student.gpaSem5 = gpaSem5;
    student.gpaSem6 =gpaSem6;
    student.CGPA =CGPA; 

    try {
        await student.save();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not update student.',
          500
        );
        return next(error);
      }
      res.status(200).json({ student: student.toObject({ getters: true }) });


};
//delete students by ID
const deleteStudent = async(req, res, next) =>{
    const studentId = req.params.sid;
    let student;
    try {
        student = await Student.findById(studentId);
    } catch (err) {
        const error = new HttpError( 'Something went wrong, could not delete student.',500);
        return next(error);
    }

    try {
        await student.remove();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete student.',500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted student'})
};

exports.getStudents = getStudents;
exports.getStudentById = getStudentById;
exports.createStudent = createStudent;
exports.updateStudentPersonalDetails = updateStudentPersonalDetails;
exports.updateStudentAcademicDetails = updateStudentAcademicDetails;
exports.deleteStudent = deleteStudent;