const { Role,
        User, 
        Category, 
        Product} = require('../models/');

const isRoleValid = async(role = '') => {
    const roleExist = await Role.findOne({role});
    if (!roleExist) {
        throw new Error(`${role} not registered in Database`)
    }
}

const emailExist = async(email='') => {
    const emailExist = await User.findOne({email});
    if (emailExist){
        throw  new Error(`${email} already exist`);
    }
}

const userIdExist = async(_id) => {
    const userIdExist = await User.findById({_id});
    if (!userIdExist){
        throw  new Error(`${_id} doesn't exist`);
    }
}

const categoryExistById = async(_id) => {
    const categoryExist = await Category.findById({_id});
    if (!categoryExist){
        throw  new Error(`${_id} doesn't exist`);
    }
}

const productExistById = async(_id) => {
    const productExist = await Product.findById({_id});
    if (!productExist){
        throw  new Error(`${_id} doesn't exist`);
    }
}

const allowedCollections = (collection = '', collections = []) => {
    const include = collections.includes(collection);
    if(!include){
        throw new Error(`${collection} not allowed`)
    }
    return true;
}

module.exports = {
    isRoleValid, 
    emailExist,
    userIdExist,
    categoryExistById,
    productExistById,
    allowedCollections
}