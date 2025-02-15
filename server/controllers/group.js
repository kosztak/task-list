const jwt = require('jsonwebtoken');
const dateFns = require('date-fns');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');

//GET

//POST
exports.postCreate = (req, res, next) => {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const {name, password} = req.body;
    
    Group.findOne({ name })
        .then(groupDoc => {
            if(groupDoc) {
                return res.status(500).json({ message: "Group already exists with given name!" });
            }

            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const group = new Group({
                        name,
                        password: hashedPassword,
                        leader: decodedToken.id,
                        members: [],
                        tasks: {
                            dailies: [],
                            todos: []
                        }
                    });

                    return group.save()
                        .then(() => {
                            return User.findById(decodedToken.id)
                                .then(user => {
                                    user.owngroup = group._id;

                                    return user.save();
                                })
                        })
                })
                
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: "Couldn't create the group!" });
        })
}