const { response } = require("express");

const validateFile = (req, res = response, next) => {
    if (!req.files || !req.files.sampleFile || Object.keys(req.files).length === 0) {
       return res.status(400).json({
            msg: 'No files were uploaded.'
          });
        ;
      }

      next();
}

module.exports = {
    validateFile
}