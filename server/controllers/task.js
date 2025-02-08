const Task = require('../models/task');

//GET
exports.getDailyData = (req, res, next) => {
    const taskId = req.query.taskId;

    Task.findById(taskId)
        .then(daily => {
            return res.status(200).json(daily)
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

    console.log(daily);
    

    Task.findByIdAndUpdate(_id, { $set: daily })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json();
        })
}