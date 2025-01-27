const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWT_KEY = process.env.JWT_KEY;

//GET

//POST
exports.postRegister = (req, res, next) => {
    const { username, password } = req.body;

    //check if user exists
    User.findOne({ username })
        .then(userDoc => {
            if(userDoc) {
                return res.status(500).json({ message: "Username already exists!" });
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
                return res.status(500).json({ message: "No account found with given username!" });
            }

            //check password
            const {_id, ...response} = user;
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if(doMatch) { // create token and give response
                        const token = jwt.sign({ id: _id }, JWT_KEY);
                        return res.cookie("token", token, { httpOnly: true }).json(response);
                    } else {
                        return res.status(500).json();
                    }
                })
                .catch(err => {
                    console.log(err);
                    
                    return res.status(500).json();
                });
        }).catch(err => {
            console.log(err);
        });
};

exports.postValidateToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) { // check if token exists
        return res.status(500).json();
    }

    // get the user belongs to the token
    const decodedToken = jwt.verify(token, JWT_KEY);
    User.findById(decodedToken)
        .then(user => {
            const {_id, ...response} = user;
            return res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
        })

}