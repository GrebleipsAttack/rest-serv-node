const { response } = require("express");
const { Category } = require('../models');


const getCategories = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categories
    });
}

const getCategory = async(req, res = response) => {
    
    const { id } =  req.params;
    const category = await Category.findById(id).populate('user','name');

    res.json(category);
}

const createCategory = async(req, res = response) => {

    const category = req.body.category.toUpperCase();

    const categoryDB = await Category.findOne({ category });
    if(categoryDB){
        return res.status(400).json({
            msg: `${categoryDB.category} already exist`
        });
    }

    const data = {
        category,
        user: req.user._id
    }

    const newCategory = new Category(data);
    await newCategory.save();

    res.status(201).json(newCategory);

}

const updateCategory = async(req, res = response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.category = data.category.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data);

    res.json(category);
}

const deleteCategory = async(req, res = response) => {
    const {id} = req.params;
    const categoryDeleted = await Category.findByIdAndUpdate(id, {status: false});
    res.json(categoryDeleted);
}


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}