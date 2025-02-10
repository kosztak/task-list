const Task = require('../models/task');

//GET
exports.getTaskData = (req, res, next) => {
    const taskId = req.query.taskId;

    Task.findById(taskId)
        .then(task => {
            return res.status(200).json(task)
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json();
        })
}

//POST

//PATCH
exports.patchDaily = (req, res, next) => {
    const { _id, ...daily } = req.body;

    Task.findByIdAndUpdate(_id, { $set: daily })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json();
        })
}

exports.patchTodo = (req, res, next) => {
    const { _id, ...todo } = req.body;

    Task.findByIdAndUpdate(_id, { $set: todo })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json();
        })
}