const router = require('express').Router();
const{ check } = require('express-validator'); 

const organizationController = require('../controllers/organization-controller');

router.get('/',organizationController.getOrganizations);

router.get('/:oid',organizationController.getOrganizationById);

const addOrganizationSchema = [

    check('organizationName').isString().notEmpty(),
    check('organizationWebsite').isString().notEmpty(),
    check('supervisorName').isString().notEmpty(),
    check('supervisorEmail').isString().isEmail().notEmpty()

];
router.post('/',addOrganizationSchema,organizationController.createOrganization);

const updateOrganizationSchema = [
    check('organizationWebsite').isString().notEmpty(),
    check('supervisorName').isString().isLength({min : 3}).notEmpty(),
    check('supervisorEmail').isString().isEmail().notEmpty()
]
router.patch('/:oid', updateOrganizationSchema, organizationController.updateOrganization);

router.delete('/:oid', organizationController.deleteOrganization);

module.exports=router;