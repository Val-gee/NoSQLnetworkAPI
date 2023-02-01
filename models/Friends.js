const { Schema, model, Types } = require('mongoose');

const friendSchema = new Schema (
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        createdAt: {
            type: Date,
            default: Date.now() // Use a getter method to format the timestamp on query ??
        }
    },
    {
        toJSON: {
            getters: true // Connected to line 16?
        },
        id: false // what is this doing?
    }
);

module.exports = friendSchema;