const { Router } =  require('express');
const { check } = require('express-validator');
const { getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products.controller');
const { productExistById,
        categoryExistById } = require('../helpers/db-validators');
const { validateJWT,
        validateFields, 
        isAdminRole} = require('../middlewares');

const router = Router();

    router.get('/', getProducts);

    router.get('/:id',[
        check('id','Not Valid product Id').isMongoId(),
        check('id').custom(productExistById),
        validateFields
    ], getProduct)

    router.post('/',[
        validateJWT,
        check('name','product name is Mandatory').not().isEmpty(),
        check('category','category Id not valid').isMongoId(),
        check('category').custom(categoryExistById),
        validateFields
    ], createProduct)

    router.put('/:id',[
        validateJWT,
        check('id').custom(productExistById),
        validateFields
    ], updateProduct)

    router.delete('/:id',[
        validateJWT,
        isAdminRole,
        check('id','Not Valid category ID').isMongoId(),
        check('id').custom(productExistById),
        validateFields
    ],deleteProduct )

module.exports = router;