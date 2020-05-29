const uuid = require('uuid/v4');
const HttpError = require("../schema/http-error");
const {validationResult} = require('express-validator');

let DUMMY_STUDENTS = [{
    id: 's1',
    name: 'swati',
    city: 'Delhi',
    paid: 'yes',
    amount: 10000
}];

//get all students
const getStudents = (req, res, next) =>{
    res.json({students: DUMMY_STUDENTS });
}

//view students by ID
const getStudentById = (req, res,next) =>{
    const studentId = req.params.sid;
    const student = DUMMY_STUDENTS.find(s=>{
        return s.id === studentId;
    });
    if(!student){
        throw new HttpError('could not find a student for the provide id',404);
    }

   res.json({student});
    
};



//Update students by ID
const updateStudent = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalids inputs passed, please check your data.',422);
    }

    const { city, paid ,amount }  = req.body;
    const studentId = req.params.sid;

    const updatedStudent = {...DUMMY_STUDENTS.find(s=> s.id===studentId )};
    const studentIndex = DUMMY_STUDENTS.findIndex(s=> s.id===studentId );

    updatedStudent.city = city;
    updatedStudent.paid = paid;
    updatedStudent.amount = amount;

    DUMMY_STUDENTS[studentIndex] = updatedStudent;
    res.status(200).json({student: updatedStudent});

};

//delete students by ID
const deleteStudent = (req, res, next) =>{
    const studentId = req.params.sid;
    if(!DUMMY_STUDENTS.find(s =>s.id==studentId)){
        throw new HttpError('Could not find a student for that id', 404);
    }
    DUMMY_STUDENTS = DUMMY_STUDENTS.filter(s => s.id !== studentId);
    res.status(200).json({ message: 'Deleted student'})
};

exports.getStudents = getStudents;
exports.getStudentById = getStudentById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;