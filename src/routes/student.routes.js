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
    check('CGPA').notEmpty(),
    check('class10percentage').notEmpty(),
    check('class12percentage').notEmpty()
]
router.patch('/up/:sid', updateStudentAcademicSchema, studentController.updateStudentAcademicDetails);

router.delete('/:sid', studentController.deleteStudent);

module.exports=router;