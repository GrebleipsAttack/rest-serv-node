const { Router } = require('express');
const { isRoleValid, emailExist, userIdExist } = require('../helpers/db-validators')
const { check } = require('express-validator');
const { userGet,
        userPut,
        userPost,
        userPatch,
        userDelete } = require('../controllers/user.controllers');
const { validateFields } = require('../middlewares/validateFields');
const router = Router();

// CRUD ROUTES
router.get('/', userGet);

router.put('/:id',[
        check('id','it is not a valid id').isMongoId(),
        check('id').custom(userIdExist),
        check('role').custom(isRoleValid),
        validateFields
], userPut);

router.post('/', [
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'the password must be more than 6 characters').isLength(6),
        check('email').custom(emailExist),
        check('role').custom(isRoleValid),
        validateFields
    ], userPost);

router.delete('/:id',[
        check('id','it is not a valid id').isMongoId(),
        check('id').custom(userIdExist),
        validateFields
    ], userDelete);


module.exports = router;