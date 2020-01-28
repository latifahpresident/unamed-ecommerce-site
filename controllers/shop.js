const Products = require('../models/products');
const Users = require('../models/users');

exports.getProducts = async (req, res) => {
    try {
        const productData = await Products.products();
        console.log(`product data: ${productData}`)
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(`No products found`);
        console.log(err)
    }
};

exports.getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const productData = await Products.productById(id)
        if(!productData) {
            res.status(404).json(`That product cannot be found`)
        } else {
            res.status(200).json(productData);
        }
    } catch (err) {
        res.status(500).json(`That product cannot be found`);
        console.log(err, 'error from product by id')
    }
};

exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params
        if (id) {
            const userData = await Users.userById(id);
            res.status(200).json(userData);
        } else {
            res.status(400).json(`That user could not be found`);
        }
    } catch(err) {
        res.status(500).json(`A user by that ID was not found`);
        console.log(`error from getUserById: ${err}`);
    }
};

//TODO: ADD BETTER ERROR HANDLING, WILL NEED TO CHECK IF USER EXISTS FIRST
exports.addUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user) {
            res.status(400).json(`Please enter all input fields`);
        } else {
            const newUser = await Users.addUser(user);
            res.status(201).json(newUser);
        }
    } catch(err) {
        res.status(500).json(`There was an error adding you information`);
        console.log(`error from addUser: ${err}`)
    }
};

exports.editUser = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(404).json(`That user was not found`);
        } else {
            const user = req.body;
            const updatedUser = await Users.editUser(user, id);
            res.status(200).json(updatedUser);
        }
    } catch(err) {
        res.status(500).json(`Cannot update the user`);
        console.log(`error from edit user: ${err}`)
    }
};