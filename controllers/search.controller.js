const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const search = (req, res = response) => {
    const { collection, term } = req.params;
    if(!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `allowed collections ${allowedCollections}`
        })
    }

    const searchUsers = async(term='', res = response) => {
        const isMongoId = ObjectId.isValid(term);
        if(isMongoId){
            const users = await User.findById(term);
            return res.json({
                results: (users) ? [users] : []
            });
        } 
        const regex = new RegExp(term, 'i');
        const users = await User.find({
            $or: [{name: regex},{email: regex}],
            $and: [{status: true}]
        });
        return res.json({
            results: users
        });
    }

    const searchCategories = async(term='', res = response) => {
        const isMongoId = ObjectId.isValid(term);
        if(isMongoId){
            const categories = await Category.findById(term)
                        .populate('user','email');
            return res.json({
                results: (categories) ? [categories] : []
            });
        } 
        
        const regex = new RegExp(term, 'i');
        const categories = await Category.find({category: regex, status: true})
                    .populate('user','email');
        res.json({
            results: categories
        });
    }

    const searchProducts = async(term='', res = response) => {
        const isMongoId = ObjectId.isValid(term);
        if(isMongoId){
            const products = await Product.findById(term)
                        .populate('category','category')
                        .populate('user','email');
            return res.json({
                results: (products) ? [products] : []
            });
        } 
        
        const regex = new RegExp(term, 'i');
        const products = await Product.find({name: regex, status: true})
                    .populate('category','category')
                    .populate('user','email');
        res.json({
            results: products
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
    
        default: res.status(500).json({
            msg: 'error'
        })
            break;
    }
}


module.exports = {
    search
}