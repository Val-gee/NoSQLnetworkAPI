const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            defualt: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now() // Use a getter method to format the timestamp on query ??
        }
    },
    {
        toJSON: {
            getters: true // Connected to line 14?
        },
        id: false // what is this doing?
    }
);

module.exports = reactionSchema;