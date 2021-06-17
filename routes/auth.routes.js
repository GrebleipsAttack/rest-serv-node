const { Router } =  require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login',[
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'id_token is mandatory').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;