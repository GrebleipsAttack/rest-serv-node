const { Router } =  require('express');
const { check } = require('express-validator');
const { uploadFile, upgradeImage, showImage } = require('../controllers/upload.controller');
const { allowedCollections } = require('../helpers/db-validators')

const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.get('/:collection/:id',[
    check('id','id is mandatory').isMongoId(),
    check('collection').custom(c => allowedCollections( c, ['users','products'])),
    validateFields
], showImage)

router.post('/',validateFile, uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id','id is mandatory').isMongoId(),
    check('collection').custom(c => allowedCollections( c, ['users','products'])),
    validateFields
], upgradeImage);

module.exports = router;