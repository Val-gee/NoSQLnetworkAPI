const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now() // Use a getter method to format the timestamp on query ??
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true, // connected to line 14?
            virtuals: true
        },
        id: false
    }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;