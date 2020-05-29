const router = require('express').Router();
const{ check } = require('express-validator'); 

const studentController = require('../controllers/student-controller');

router.get('/',studentController.getStudents);

router.get('/:sid',studentController.getStudentById);

router.patch('/:sid', studentController.updateStudent);

router.delete('/:sid', studentController.deleteStudent);

module.exports=router;