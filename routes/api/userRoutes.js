const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// /api/users
router.route('/')
    // .get all users
    .get(getUsers)
    // .post a new user
    .post(createUser);


// /api/users/:userId
router.route('/:userId')
    // .get single user by _id (and populate thought and friend data)
    .get(getSingleUser)
    // .put to update a user by _id
    .put(updateUser)
    // .delete a user by _id
    // **BONUS** remove associated thoughts when a user is deleted
    .delete(deleteUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    // .post to add a new friend to users friend list
    .post(addFriend)
    // .delete to remove a friend from a users friend list
    .delete(deleteFriend);

module.exports = router;
