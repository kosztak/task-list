const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        point: {
            type: Number,
            required: true
        }
    }],
    tasks: {
        dailies: [{
            taskId: {
                type: Schema.Types.ObjectId,
                ref: 'Task',
                required: true
            },
            difficulty: {
                type: Number,
                required: true
            },
            participants: [{
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                done: {
                    type: Boolean,
                    required: true
                }
            }]
        }],
        todos: [{
            taskId: {
                type: Schema.Types.ObjectId,
                ref: 'Task',
                required: true
            },
            difficulty: {
                type: Number,
                required: true
            },
            participants: [{
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                done: {
                    type: Boolean,
                    required: true
                }
            }]
        }]
    }
})

module.exports = mongoose.model('Group', groupSchema);