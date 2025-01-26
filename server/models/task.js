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
        required: true
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
            type: String //day, week, month
        },
        done: {
            type: Boolean
        }
    }
})

module.exports = mongoose.model('Task', taskSchema);