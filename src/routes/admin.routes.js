const {v4: uuid} = require('uuid')
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Student = require('../schema/student')
const { authenticateJWT } = require('../jwt')

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
module.exports = router