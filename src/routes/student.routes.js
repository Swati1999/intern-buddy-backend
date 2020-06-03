const router = require('express').Router();
const{ check } = require('express-validator'); 

const studentController = require('../controllers/student-controller');

router.get('/',studentController.getStudents);

router.get('/:sid',studentController.getStudentById);

const addStudentSchema = [

    check('firstName').isString().notEmpty(),
    check('lastName').isString().notEmpty(),
    check('email').isString().isEmail().notEmpty()
];
router.post('/',addStudentSchema,studentController.createStudent);

const updateStudentPersonalSchema = [
    check('firstName').isString().notEmpty(),
    check('lastName').isString().notEmpty(),
    check('email').isString().isEmail().notEmpty()
]
router.patch('/:sid',updateStudentPersonalSchema, studentController.updateStudentPersonalDetails);

const updateStudentAcademicSchema = [
    check('CGPA').isNumeric,
    check('class10percentage').isNumeric,
    check('class12percentage').isNumeric
]
router.patch('/up/:sid', updateStudentAcademicSchema, studentController.updateStudentPersonalDetails);

router.delete('/:sid', studentController.deleteStudent);

module.exports=router;