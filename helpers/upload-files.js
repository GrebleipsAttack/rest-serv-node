const path = require('path');
const { v4: uuidv4 } = require('uuid');

const updateFiles = (files, allowedExtensions = ['png','jpg','jpeg','gif'], folder='') => {

    return new Promise( (resolve, reject) => {
        const {sampleFile} = files;
        const cutName =  sampleFile.name.split('.');
        const extension =  cutName[cutName.length -1];
        if(!allowedExtensions.includes(extension)){
            return reject(`${extension} files not allowed`)
        }

        const tempName = uuidv4()+'.'+extension;
        const uploadPath = path.join(__dirname, '../storage/',folder, tempName);
    
        sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return reject(err);
        }

        resolve(tempName);
        });
    });    
}

module.exports = updateFiles;