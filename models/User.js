const { Schema, model } = require('mongoose');

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
            required: [true, "User email required."],
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        thoughs: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "friend"
            }
        ]
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