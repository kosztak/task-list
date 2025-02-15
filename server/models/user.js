const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image : {
        type: String
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }],
    owngroup: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    tasks: {
        dailies: [{
            taskId: {
                type: Schema.Types.ObjectId,
                ref: 'Task',
                required: true
            },
            done: {
                type: Boolean,
                required: true
            }
        }],
        todos: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true         
        }]
    }
});

module.exports = mongoose.model('User', userSchema);