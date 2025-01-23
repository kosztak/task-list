const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    reserTokenExpiration: Date,
    tasks: [
        {
            taskId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            description: {
                type: String,
            },
            period: {
                type: String
            },
            date: {
                type: Date,
                required: true
            }
        }
    ]
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