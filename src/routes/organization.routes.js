const router = require('express').Router();
const organizationController = require('../controllers/organization-controller');

router.get('/:oid',organizationController.getOrganizationById);

router.post('/',organizationController.createOrganization);

router.patch('/:oid', organizationController.updateOrganization);
router.delete('/:oid', organizationController.deleteOrganization);

module.exports=router;