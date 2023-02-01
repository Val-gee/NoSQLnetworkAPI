const { ObjectId } = require('mongoose').Types;
const { Thought, Reactions } = require('../models');

const reactionCount = async (thoughtId) =>
    Thought.aggregate([{ $match: { _id: ObjectId(thoughtId) } }])
        .count('reactionCount')
        .then((numberOfReactions) => numberOfReactions)

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        console.log('GET /api/thoughts')
        Thought.find({})
            .then(async (thoughts) => {
                console.log(thoughts);
                const thoughtObj = {
                    thoughts,
                    // reactions: await reactionCount(req.params.thoughtId)
                };
                res.json(thoughtObj)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //get single thought
    getSingleThought(req, res) {
        console.log('GET /api/thoughts/:thoughtId');

        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json({ thought, reaction: await reactionCount(req.params.thoughtId) })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    //create thought
    createThought(req, res) {
        console.log('Post /api/thoughts');

        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    // update thought
    updateThought(req, res) {
        console.log('PUT /api/thoughts/:thoughtId');

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    },
    // delete thought
    deleteThought(req, res) {
        console.log('DELETE /api/thoughts/:thoughtId');

        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json("Thought successfully deleted!")
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })

    },
    //add reaction
    addReaction(req, res) {
        console.log('POST /api/thoughts/:thoughtId/reactions');
        console.log('You are adding a reaction!');
        console.log(req.body);

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json(thought)
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    // delete reaction
    deleteReaction(req, res) {
        console.log('DELETE /api/thoughts/:thoughtId/reactions/:reactionId');

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            })
    }
}