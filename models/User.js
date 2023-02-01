const { Schema, model } = require('mongoose');
const friendSchema = require('./Friends');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: { // is this correct?
                validator: function(v) {
                    return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [friendSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false // what is this doing?
    }
);

const User = model('user', userSchema);

module.exports = User;