const  fieldValidator = require('../middlewares/validateFields');
const  JWTValidator = require('../middlewares/validate-jwt');
const  RoleValidator = require('../middlewares/validate-role');

module.exports = {
    ...fieldValidator,
    ...JWTValidator,
    ...RoleValidator
}