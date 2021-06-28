const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const googleVeriff = require('./google-veriff');
const uploadFiles = require('./upload-files');

module.exports = {
    dbValidators,
    generateJWT,
    googleVeriff,
    uploadFiles
}