const jwt = require('jsonwebtoken');
const dateFns = require('date-fns');

const User = require('../models/user');
const Task = require('../models/task');

//GET
exports.getDailies = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    User.findById(decodedToken.id)
        .populate("tasks.dailies.taskId")
        .then(user => {
            const daliesList = [...user.tasks.dailies];
            const transformedDailies = daliesList.map(task => {
                return {
                    _id: task.taskId._id,
                    date: dateFns.subDays(task.taskId.date, 1),
                    description: task.taskId.description,
                    name: task.taskId.name,
                    renewel: task.taskId.renewel,
                    done: task.done
                }
            })
            
            return res.status(200).json(transformedDailies);
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
                    gap
                };
                user.tasks.dailies.push({ taskId: task._id, done: true });
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

exports.postDeleteTodo = (req, res, next) => {
    const {taskId} = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    User.findById(decodedToken.id)
        .then(user => {
            if(!user) {
                return res.status(500).json();
            }

            user.tasks.todos = user.tasks.todos.filter(task => task.toString() !== taskId);
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

exports.postDeleteDaily = (req, res, next) => {
    const {taskId} = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    User.findById(decodedToken.id)
        .then(user => {
            if(!user) {
                return res.status(500).json();
            }

            user.tasks.dailies = user.tasks.dailies.filter(task => task.taskId.toString() !== taskId);
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

exports.postCheckDaily = (req, res, next) => {
    const {taskId} = req.body;
    
    Task.findById(taskId)
        .then(task => {
            task.renewel.done = true;

            return task.save();
        }).then(() => {
            return res.status(200).json();
        }).catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}