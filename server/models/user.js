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
        groupId: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        }
    }],
    owngroup: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    tasks: {
        dailies: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        }],
        todos: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true         
        }]
    }
});

userSchema.methods.addTask = (task) => {
    this.tasks = this.tasks.push(task);

    return this.save();
}

userSchema.methods.deleteTask = (taskId) => {
    this.tasks = this.tasks.filter(task => task.taskId.toString() !== taskId.toString());
    
    return this.save();
}

module.exports = mongoose.model('User', userSchema);