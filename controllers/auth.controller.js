const { response } = require('express');
const User =  require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const user =  await User.findOne({email});

        const validPassword = bcryptjs.compareSync( password, user.password );
        if(!user || !user.status || !validPassword){
            return res.status(400).json({
                msg: 'Wrong email or password'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
        msg: 'login OK',
        user,
        token
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: 'Internal server error, please contact with Admin\n'
        })
    }
}

module.exports = {
    login
}