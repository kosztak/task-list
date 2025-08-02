const dateFns = require('date-fns')

const Task = require('../models/task');
const User = require('../models/user');
const Group = require('../models/group');

// Runs on every server start. This checks the validity of all tasks by date and period attributes.
// This function should run on every midnight or so, but for development purposes it runs on every start.
function taskStateCheck() {
    const today = Date.now();
    
    Task.find({ date: { $lte: today } })
        .then(tasks => {

        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = taskStateCheck;