const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Admin = require('../schema/admin')
const Student = require('../schema/student')
const { generateToken, authenticateJWT } = require('../jwt')


const registrationBodySchema = [
   check('userId').isString().notEmpty(),
   check('firstName').isString().notEmpty(),
   check('lastName').isString().notEmpty(),
   check('email').isString().isEmail().notEmpty(),
   check('contactNo').isString().isNumeric().notEmpty(),
   check('password').isString().notEmpty()
]


router.post('/register', registrationBodySchema, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { userId, firstName, middleName, lastName, email, contactNo, password } = req.body
    Admin.create({
        userId, firstName, middleName, lastName, email, contactNo, password 
    })
    .then(user => res.send(user))
    .catch(err => res.status(422).json({errors: err.message}))
})

const loginBodySchema = [
    check('userId').isString().notEmpty(),
    check('password').isString().notEmpty(),
    check('userType').isString().isIn(['admin', 'student'])
]


router.post('/login', loginBodySchema, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }    

    const {userId, password, userType} = req.body;
    if (userType === 'admin') {
        Admin.findOne({userId, password}).then(user => 
            res.status(200).json({token: generateToken({userId: user.userId, role: 'admin'})})
        ).catch(err => res.status(401).json({error: "Invalid UserId or Password"}))
    }
    else {
        Student.findOne({userId, password}).then(user => 
            res.status(200).json({token: generateToken({userId: user.userId, role: 'student'})})
        ).catch(err => res.status(401).json({error: "Invalid UserId or Password"}))
    }
})


router.get('/me', authenticateJWT, (req, res) => {
    res.json(req.user)
})

module.exports = router;