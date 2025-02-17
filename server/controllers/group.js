const jwt = require('jsonwebtoken');
const dateFns = require('date-fns');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');

//GET
exports.getGroupData = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const groupId = req.query.groupId;

    Group.findById(groupId)
        .populate("members.userId", "username _id")
        .populate("tasks.dailies.taskId", "name description date renewel")
        .populate("tasks.todos.taskId", "name description date")
        .then(group => {
            if(group.members.filter(member => member.userId._id.toString() === decodedToken.id).length === 0) {
                return res.status(500).json();
            }
            
            const formedMembers = group.members.map(member => ({
                id: member.userId._id,
                username: member.userId.username,
                point: member.point
            }));

            const filteredTasks = {
                dailies: group.tasks.dailies.filter(task => task.participants.find(part => part.userId.toString() === decodedToken.id)),
                todos: group.tasks.todos.filter(task => (task.participants.find(part => part.userId.toString() === decodedToken.id && !part.done)))
            }

            const responseData = {
                name: group.name,
                leader: group.leader,
                members: formedMembers,
                tasks: filteredTasks
            };

            return res.status(200).json({ isLeader: (group.leader.toString() === decodedToken.id), group: responseData })
            
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}


//POST
exports.postCreate = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const {name, password} = req.body;
    
    Group.findOne({ name })
        .then(groupDoc => {
            if(groupDoc) {
                return res.status(500).json({ message: "Group already exists with given name!" });
            }

            return User.findById(decodedToken.id)
                .then(user => {
                    return bcrypt.hash(password, 12)
                        .then(hashedPassword => {
                            const group = new Group({
                                name,
                                password: hashedPassword,
                                leader: decodedToken.id,
                                members: [{ userId: user._id, point: 0 }],
                                tasks: {
                                    dailies: [],
                                    todos: []
                                }
                            });
        
                            return group.save()
                                .then(() => {
                                    user.owngroup = group._id;
        
                                    return user.save();
                                })
                                .then(() => {
                                    return res.status(200).json({ groupId: group._id });
                                })
                        })
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: "Couldn't create the group!" });
        })
}