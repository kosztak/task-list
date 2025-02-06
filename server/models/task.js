const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    The ownerId property linked to a user or a group which it belongs to.

    The difference between todo and daily tasks is the renewel property.
    If there's no renewel data in a task, than it is a todo.
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
    description: {
        type: String
    },
    date: { //in todos this is the due date  of the task, in dailies this is the start dateof the period
        type: Date,
        required: true
    },
    renewel: { //only stored in dailies
        period: {
            type: String //day, week, month
        },
        gap: {
            type: Number
        }
    }
})

module.exports = mongoose.model('Task', taskSchema);