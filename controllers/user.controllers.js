const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User =  require('../models/user.model');

const userGet = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {
    
    const { name, email, password, role} = req.body;
    const user =  new User({name, email, password, role});

    
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(201).json({
        ok: 'true',
        user
    });
}

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...leftover } = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        leftover.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, leftover);

    res.json({
        ok: 'true',
        user
    });
}

const userDelete = async(req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json({
        user,
        ok: 'true',
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}