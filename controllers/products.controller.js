const { response } = require("express");
const { Product } = require('../models');

const getProducts = async(req, res = response) => {
    const { limit = 10, from = 0 } = req.query;
    const query = {status: true};
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    });
}

const getProduct = async(req, res = response) => {
    const { id } =  req.params;
    const product = await Product.findById(id)
        .populate('user','name')
        .populate('category','name');

    res.json(product);
}

const createProduct = async(req, res = response) => {
    const { status, user, ...body} = req.body;
    const productDB = await Product.findOne({ name: req.body.name });
    if(productDB){
        return res.status(400).json({
            msg: `${productDB.name} already exist`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }
    const newProduct = new Product(data);
    await newProduct.save();

    res.status(201).json(newProduct);
}

const updateProduct = async(req, res = response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;
    if ( data.name ){
        data.name  =  data.name.toUpperCase();
    }
    data.user = req.user.id;
    const product = await Product.findByIdAndUpdate(id, data);

    res.json(product);
}

const deleteProduct = async(req, res = response) => {
    const {id} = req.params;
    const productDeleted = await Product.findByIdAndUpdate(id, {status: false});
    
    res.json(productDeleted);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}