const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Task = require('../models/task');
const user = require('../models/user');

//GET
exports.getDailies = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    User.findById(decodedToken.id)
        .populate("tasks.dailies")
        .then(user => {
            return res.status(200).json(user.tasks.dailies);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}

exports.getTodos = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    User.findById(decodedToken.id)
        .populate("tasks.todos")
        .then(user => {
            return res.status(200).json(user.tasks.todos);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}

//POST
exports.postAddTask = (req, res, next) => {
    const {name, description, date, period, gap} = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    const task = new Task({
        ownerId: decodedToken.id,
        ownerType: "User",
        name,
        date,
        description
    });

    User.findById(decodedToken.id)
        .then(user => {
            if(period) {
                task.renewel = {
                    period,
                    gap,
                    done: false
                };
                user.tasks.dailies.push(task._id);
            } else {
                user.tasks.todos.push(task._id);
            }

            return user.save();
        })
        .then(() => {
            return task.save();
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}

exports.postCheckTodo = (req, res, next) => {
    const {taskId} = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    User.findById(decodedToken.id)
        .then(user => {
            if(!user) {
                return res.status(500).json();
            }

            user.tasks.todos = user.tasks.todos.filter(task => task._id.toString() !== taskId);
            return user.save();
        }).then(() => {
            return Task.findByIdAndDelete(taskId);
        }).then(() => {
            return res.status(200).json();
        }).catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}