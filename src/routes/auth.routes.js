const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const yup = require('yup')
const Admin = require('../schema/admin')


const registrationBodySchema = yup.object().shape({
    userId: yup.string().required(),
    firstName: yup.string().required(),
    middleName: yup.string(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    contactNo: yup.string().required(),
    password: yup.string().required()
})


router.post('/register', (req, res) => {
    console.log(req.body)
    registrationBodySchema.validate(req.body)
    .catch(err=> console.log(err))
    // Admin.create({
    //     userId,
    //     firstName,
    //     middleName,
    //     lastName,
    //     email,
    //     contactNo,
    //     password
    // })
    // .then(val => res.send(val))
    // .catch(err => res.status(422).json({errors: err.message}))
    res.send(true)
})
const loginBodySchema = yup.object().shape({
    userId: yup.string().required(),
    password: yup.string().required(),
    userType: yup.string().oneOf(["admin","student"]).required()
})
router.post('/login', (req, res) => {
    console.log(req)
    loginBodySchema.validate(req.body)
    .catch(err=> console.log(err))
    return res.send()
})

module.exports = router;