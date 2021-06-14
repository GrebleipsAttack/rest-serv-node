const Role = require('../models/role.model.js');
const User =  require('../models/user.model');


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

const userIdExist = async(id) => {
    const userIdExist = await User.findById({id});
    if (!userIdExist){
        throw  new Error(`${id} is not a valid id`);
    }
}

module.exports = {
    isRoleValid, 
    emailExist,
    userIdExist
}