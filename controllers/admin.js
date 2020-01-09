const Users = require('../models/users');

exports.getUsers = async (req, res) => {
    try {
        const UserData = await Users.users();
        res.status(200).json(UserData);
    } catch (err) {
        res.status(500).json(`No users found`);
        console.log(`error from getUsers: ${err}`)
    }
};

exports.getUserById = async (req, res) => {
    try {
        const {firebase_id} = req.params
        if (firebase_id) {
            const userData = await Users.userById(firebase_id);
            res.status(200).json(userData);
        } else {
            res.status(400).json(`That user could not be found`);
        }
    } catch(err) {
        res.status(500).json(`A user by that ID was not found`);
        console.log(`error from getUserById: ${err}`);
    }
};