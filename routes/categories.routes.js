const { Router } =  require('express');
const { check } = require('express-validator');
const { getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory } = require('../controllers/categories.controller');
const { categoryExistById, } = require('../helpers/db-validators');
const { validateJWT,
        validateFields, 
        isAdminRole} = require('../middlewares');


const router = Router();

    router.get('/', getCategories);

    router.get('/:id',[
        check('id','Not Valid category ID').isMongoId(),
        check('id').custom(categoryExistById),
        validateFields
    ], getCategory)

    router.post('/',[
        validateJWT,
        check('category','category is mandatory').not().isEmpty(),
        validateFields
        ], createCategory)

    router.put('/:id',[
        validateJWT,
        check('category','category is mandatory').not().isEmpty(),
        check('id').custom(categoryExistById),
        validateFields
    ], updateCategory)

    router.delete('/:id',[
        validateJWT,
        isAdminRole,
        check('id','Not Valid category ID').isMongoId(),
        check('id').custom(categoryExistById),
        validateFields
    ],deleteCategory )

module.exports = router;