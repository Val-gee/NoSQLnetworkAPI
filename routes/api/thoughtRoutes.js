const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController')
// /api/thoughts
router.route('/')
    // .get to get all thoughts
    .get(getThoughts)
    // .post a new thought (dont forget to push new thought into the users thought array field)
    .post(createThought);


// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    // .get to get a single though by its _id
    .get(getSingleThought)
    // .put to update a thought by _id
    .put(updateThought)
    // .delete to remove a thought by its _id
    .delete(deleteThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    // .post to create a reaction stored in a single thought's reaction array field
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    // .delete to pull a reaction by the reactionId value
    .delete(deleteReaction);

module.exports = router;