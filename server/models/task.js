const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    The ownerId property linked to a user or a group which it belongs to.

    The difference between todo and daily tasks is the renewel property.
    If there's no renewel data in a task, than it is a todo.

    In case of the task is a todo, the date property is the date of creation of the task.
    If the task is a daily, then the date property is the date of the renewel of the period.
*/
const taskSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        refPath: 'ownerType',
        required: true
    },
    ownerType: {
        type: String,
        required: true,
        enum: ['User', 'Group']
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    renewel: { //only stored in dailies
        period: {
            type: String, //day, week, month
            required: true
        },
        gap: {
            type: Number,
            required: true
        },
        done: {
            type: Boolean,
            required: true
        }
    }
})

module.exports = mongoose.model('Task', taskSchema);