const { response, request } = require('express');
const JWT = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async(req = request, res = response, next) => {

    const token =  req.header('token');

    if (!token){
        return res.status(401).json({
            msg:'missing token'
        });
    }

    try {
        const { uid } = JWT.verify( token, process.env.SECRET_KEY);

        const user = await User.findById( uid );
        if(!user || !user.status){
            return res.status(401).json({
                msg: 'token invalid'
            })
        }
        
        req.user = user;
        next();

    } catch(err){
        console.log(err);
        res.status(401).json({
            msg: 'token invalid'
        })
    }
}

module.exports = {
    validateJWT
}