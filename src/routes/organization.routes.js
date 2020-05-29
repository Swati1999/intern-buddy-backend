const router = require('express').Router();
const{ check } = require('express-validator'); 

const organizationController = require('../controllers/organization-controller');

router.get('/',organizationController.getOrganizations);

router.get('/:oid',organizationController.getOrganizationById);

router.post(
    '/',
    [
        check('name')
            .not()
            .isEmpty(),
        check('city')
            .isLength({min: 3}),
        check('paid')
            .not().
            isEmpty()
    ],
    organizationController.createOrganization);

router.patch(
    '/:oid',
    [
        check('city')
            .isLength({min: 3}),
        check('paid')
            .not().
            isEmpty()
    ],
     organizationController.updateOrganization);

router.delete('/:oid', organizationController.deleteOrganization);

module.exports=router;