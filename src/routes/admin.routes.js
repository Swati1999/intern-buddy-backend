const {v4: uuid} = require('uuid')
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Student = require('../schema/student')
const { authenticateJWT } = require('../jwt')
const adminController = require('../controllers/admin-controller');

const addStudentSchema = [
    check('userId').isString().notEmpty(),
    check('firstName').isString().notEmpty(),
    check('lastName').isString().notEmpty(),
    check('email').isString().isEmail().notEmpty()
 ] 
router.post('/add/student',authenticateJWT, addStudentSchema, (req,res)=>{
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { userId, firstName, lastName, email} = req.body
      Student.create({
          userId, personalDetails: {firstName, lastName, email}, resetPasswordToken: uuid()
      })
      .then(user => res.send(user))
      .catch(err => res.status(422).json({errors: err.message}))
}
)

router.get('/',adminController.getAdmins);

router.get('/:aid',adminController.getAdminById);

const updateAdminSchema = [ 
    check('email').isString().isEmail().notEmpty(),
    check('contactNo').isLength({min :10}),
    check('password').isLength({ min : 4 })
]
router.patch('/:aid', updateAdminSchema  , adminController.updateAdmin);

router.delete('/:aid', adminController.deleteAdmin);

module.exports = router