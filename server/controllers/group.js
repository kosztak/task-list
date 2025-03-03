const jwt = require('jsonwebtoken');
const dateFns = require('date-fns');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');

//GET
// gives back all data, that is shown on the group page on front-end
exports.getGroupData = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const groupId = req.query.groupId;

    Group.findById(groupId) // find group and populate it with necessary data
        .populate("members.userId", "username _id")
        .populate("tasks.dailies.taskId", "name description date renewel")
        .populate("tasks.todos.taskId", "name description date")
        .then(group => {
            // checks if the user is anot a member of the group
            if(group.members.filter(member => member.userId._id.toString() === decodedToken.id).length === 0) {
                return res.status(500).json();
            }
            
            // gets only the necessary data from the group members
            const formedMembers = group.members.map(member => ({
                id: member.userId._id,
                username: member.userId.username,
                point: member.point
            }));            

            // gets only dailies where the user is a participant
            const dailies = group.tasks.dailies.filter(task => task.participants.find(part => part.userId.toString() === decodedToken.id)).map(task => ({
                difficulty: task.difficulty,
                done: task.participants.find(part => part.userId.toString() === decodedToken.id).done,
                _id: task.taskId._id,
                name: task.taskId.name,
                description: task.taskId.description,
                date: dateFns.subDays(task.taskId.date, 1),
                renewel: task.taskId.renewel
            }));

            // gets only to-dos where the user is a participant
            const todos = group.tasks.todos.filter(task => (task.participants.find(part => part.userId.toString() === decodedToken.id && !part.done)));

            const filteredTasks = {
                dailies: dailies,
                todos: todos
            }

            const responseData = {
                name: group.name,
                leader: group.leader,
                members: formedMembers,
                tasks: filteredTasks,
                ...(group.image && { image: group.image }) // gives back the image property if there is any
            };

            return res.status(200).json({ isLeader: (group.leader.toString() === decodedToken.id), group: responseData })
            
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

// gives back data from all group members
exports.getMembers = (req, res, next) => {
    const { groupId, omitLeader } = req.query;
    
    Group.findById(groupId)
        .populate("members.userId", "_id username")
        .then(group => {
            if (!group) {
                return res.status(500).json();
            }

            let formedMembers = group.members.map(member => ({
                id: member.userId._id,
                username: member.userId.username,
                point: member.point
            }));

            if(omitLeader) {
                formedMembers = formedMembers.filter(member => member.id.toString() !== group.leader.toString());
            }

            return res.status(200).json({ members: formedMembers });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

//gives back data of all dailies of the group to the group leader
exports.getDailies = (req, res, next) => {
    const groupId = req.query.groupId;

    Group.findById(groupId)
        .populate("tasks.dailies.taskId", "name description date renewel")
        .populate("tasks.dailies.participants.userId", "username")
        .then(group => {
            const formedDailiesList = group.tasks.dailies.map(task => ({
                id: task.taskId._id,
                name: task.taskId.name,
                description: task.taskId.description,
                date: task.taskId.date,
                period: task.taskId.renewel.period,
                gap: task.taskId.renewel.gap,
                difficulty: task.difficulty,
                participants: task.participants.map(part => part.userId.username)
            }));

            return res.status(200).json({ taskDataList: formedDailiesList });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

//gives back data of all to-dos of the group to the group leader
exports.getTodos = (req, res, next) => {
    const groupId = req.query.groupId;

    Group.findById(groupId)
        .populate("tasks.todos.taskId", "name description date renewel")
        .populate("tasks.todos.participants.userId", "username")
        .then(group => {
            const formedTodosList = group.tasks.todos.map(task => ({
                id: task.taskId._id,
                name: task.taskId.name,
                description: task.taskId.description,
                date: task.taskId.date,
                difficulty: task.difficulty,
                participants: task.participants.map(part => part.userId.username)
            }));

            return res.status(200).json({ taskDataList: formedTodosList });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

exports.getTaskData = (req, res, next) => {
    const { groupId, type, taskId } = req.query;

    Group.findById(groupId, `tasks.${type}`)
        .populate(`tasks.${type}.taskId`)
        .then(({ tasks }) => {
            const task = tasks[type][0];
            
            const formedTask = {
                id: task.taskId._id,
                name: task.taskId.name,
                description: task.taskId.description,
                date: task.taskId.date,
                period: task.taskId.renewel.period,
                gap: task.taskId.renewel.gap,
                difficulty: task.difficulty,
                participants: task.participants.map(part => part.userId.username)
            };
            
            return res.status(200).json({ task: formedTask });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

//POST
// cerates a new group
exports.postCreate = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const {name, password} = req.body;
    
    Group.findOne({ name })
        .then(groupDoc => {
            if(groupDoc) { // checks if the user already has an own group
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

// adds a task to the group
exports.postAddTask = (req, res, next) => {
    const { groupId, name, description, date, period, gap, difficulty, participants } = req.body;
    
    const task = new Task({ // create new task and fill it up with data 
        ownerId: groupId,
        ownerType: "Group",
        name,
        date,
        description
    });

    Group.findById(groupId)
        .then(group => {
            const formedParticipants = participants.map(part => ({
                userId: part,
                done: false
            }))

            if (period) {
                task.renewel = {
                    period,
                    gap
                };

                group.tasks.dailies.push({
                    taskId: task._id,
                    difficulty,
                    participants: formedParticipants
                });
            } else {
                group.tasks.todos.push({
                    taskId: task._id,
                    difficulty,
                    participants: formedParticipants
                });
            }

            return group.save();
        })
        .then(() => {
            return task.save();
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

// checks a todo for a user
exports.postCheckTodo = (req, res, next) => {
    const { taskId } = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    Task.findById(taskId)
        .then(task => {
            Group.findById(task.ownerId)
                .then(group => {
                    const todoToCheck = group.tasks.todos.find(task => task.taskId.toString() === taskId);
                    const participantTocheck = todoToCheck.participants.find(part => part.userId.toString() === decodedToken.id);
                    participantTocheck.done = true;

                    return group.save();
                })
                .then(() => {
                    return res.status(200).json();
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

// checks a daily for a user
exports.postCheckDaily = (req, res, next) => {
    const { taskId } = req.body;
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    Task.findById(taskId)
        .then(task => {
            Group.findById(task.ownerId)
                .then(group => {
                    const dailyToCheck = group.tasks.dailies.find(task => task.taskId.toString() === taskId);
                    const participantTocheck = dailyToCheck.participants.find(part => part.userId.toString() === decodedToken.id);
                    participantTocheck.done = true;

                    return group.save();
                })
                .then(() => {
                    return res.status(200).json();
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json();
        })
}

//DELETE
// deletes given task from group
exports.deleteTask = (req, res, next) => {
    const { taskId, isDaily } = req.query;

    Task.findById(taskId)
        .then(task => {
            if(!task) {
                return res.status(500).json();
            }

            return Group.findById(task.ownerId)
                .then(group => {
                    if(!group) {
                        return res.status(500).json();
                    }

                    if (isDaily) {
                        group.tasks.dailies = group.tasks.dailies.filter(task => task.taskId.toString() !== taskId);
                    } else {
                        console.log(group.tasks.todos);
                        group.tasks.todos = group.tasks.todos.filter(task => task.taskId.toString() !== taskId);
                        console.log(group.tasks.todos);
                    }

                    return group.save();
                })
                .then(() => {
                    return task.deleteOne();
                })
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json();
        });
}

exports.deleteMember = (req, res, next) => {
    const { groupId, userId } = req.query;

    Group.findById(groupId)
        .then(group => {
            if (!group) {
                return res.status(500).json({ message: 'Group not found' });
            }

            // Remove the user from the group's members
            group.members = group.members.filter(member => member.userId.toString() !== userId);

            // Remove the user from all group tasks as a participant
            group.tasks.dailies.forEach(task => {
                task.participants = task.participants.filter(participant => participant.userId.toString() !== userId);
            });

            group.tasks.todos.forEach(task => {
                task.participants = task.participants.filter(participant => participant.userId.toString() !== userId);
            });

            return group.save();
        })
        .then(() => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Remove the group from the user's group list
            user.groups = user.groups.filter(group => group.toString() !== groupId);

            return user.save();
        })
        .then(() => {
            return res.status(200).json({ message: 'Member deleted successfully' });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'An error occurred' });
        });
}

//PATCH
// updates the given properties of a group
exports.patchInfo = async (req, res, next) => {
    const { groupId, ...requestData } = req.body;

    if(requestData.password) {
        requestData.password = await bcrypt.hash(requestData.password, 12)
    }

    if(req.file) {
        const fileName = groupId + '.' + req.file.originalname.split('.')[1];
        fs.writeFileSync(`./images/groups/${fileName}`, req.file.buffer);
        requestData.image = fileName;
    }

    Group.findByIdAndUpdate(groupId, { $set: requestData })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Couldn't update group data!" });
        })
    
}