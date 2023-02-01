const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//aggregate function to get friend count
const friendCount = async (userId) =>
    User.aggregate([{ $match: { _id: ObjectId(userId) } }])
        .count('friendCount')
        .then((numberOfFriends) => numberOfFriends)

module.exports = {
    // get all users
    getUsers(req, res) {
        console.log('GET /api/users')

        User.find({})
        .select('-__v')
            .then(async (users) => {
                console.log(users);
                
                return res.json(users)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    // get single user
    getSingleUser(req, res) {
        console.log('GET /api/users/:userId');

        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that id!' })
                    : res.json({
                        user,
                        friends: await friendCount(req.params.userId)
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //create user
    createUser(req, res) {
        console.log('POST /api/users');

        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //update user
    updateUser(req, res) {
        console.log('PUT /api/users/:userId');

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User with that id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //delete user
    deleteUser(req, res) {
        console.log('DELETE /api/users/:userId');

        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json("User was successfully deleted!")
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //create friend
    addFriend(req, res) {
        console.log('POST /api/users/:userId/friend');
        console.log('You are adding a friend!');
        console.log(req.body);

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.json({ message: 'No user found with that id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //delete friend
    deleteFriend(req, res) {
        console.log('Delete /api/users/:userId/friends/:friendId');

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { _id: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that id!" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    }

};
