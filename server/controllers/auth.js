const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//GET

//POST
exports.postRegister = (req, res, next) => {
    const { username, password, realname } = req.body;

    //check if user exists
    User.findOne({ username })
        .then(userDoc => {
            if(userDoc) {
                return res.status(500).json();
            }

            //save account
            return bcrypt.hash(password, 12)
                .then(password => {
                    const user = new User({
                        username,
                        password,
                        groups: [],
                        tasks:{
                            dailies: [],
                            todos: []
                        }
                    });
                    return user.save();
                }).then(() => {
                    return res.status(200).json();
                });
        })
        .catch(err => { console.log(err) })
}

exports.postLogin = (req, res, next) => {
    const { username, password } = req.body;

    //check if user exists
    User.findOne({ username })
        .then(user => {
            if(!user) {
                return res.status(500).json();
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if(doMatch) { // create token and give response
                        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
                        const response = {
                            username: user.username,
                            groups: user.groups,
                            tasks: user.tasks
                        }
                        return res.cookie("token", token, { httpOnly: true }).json(response)
                    } else {
                        return res.status(500).json();
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        }).catch(err => {
            console.log(err);
        });
};