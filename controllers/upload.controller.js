const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFiles } = require('../helpers');

const {User, Product} =  require('../models')

const uploadFile = async(req, res =  response) => {
    try {
        const file = await uploadFiles(req.files, undefined,'images');
        res.json({file})       
    } catch (err) {res.status(400).json(err)} 
}

const upgradeImage = async(req, res = response) => {
    const {id, collection} =  req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `user ${id} doesn't exist`
                })
            }
        break;  
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `product ${id} doesn't exist`
                })
            }
        break;   
        default:
            return res.status(500).json({msg: 'Internal server error'})
    }

    if(model.img){
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length-1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);

    }
    const {tempFilePath} = req.files.sampleFile;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;  
    await model.save();

    res.json(model);
}

const showImage = async(req, res = response) => {
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `user ${id} doesn't exist`
                })
            }
        break;  
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `product ${id} doesn't exist`
                })
            }
        break;   
        default:
            return res.status(500).json({msg: 'Internal server error'});
    }

    if(model.img){
        const imgPath = path.join( __dirname,'../storage',collection,model.img);
        if(fs.existsSync(imgPath)){
            return res.sendFile(imgPath)
        }
    } 

    const noImage = path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(noImage);
}

module.exports = {
    uploadFile,
    upgradeImage,
    showImage
}