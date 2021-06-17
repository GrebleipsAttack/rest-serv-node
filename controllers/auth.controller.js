const { response } = require('express');
const User =  require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVeriff } = require('../helpers/google-veriff');


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
            msg: 'Internal server error, please contact with Admin'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    
    try{
        const {email, name, img} = await googleVeriff(id_token);
        let user = await User.findOne({ email });

        if (!user){
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status){
            res.status(401).json({
                msg: 'user banned'
            })
        }

        const token = await generateJWT(user.id);
       
        res.json({
            msg: 'Google SignIn OK',
            user,
            token
        })

    } catch(err){
        res.status(400).json({
            msg: 'invalid token'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}