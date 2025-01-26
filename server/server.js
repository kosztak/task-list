const fs = require('fs')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const MONGODB_URI = fs.readFileSync('./data/databaseKey.txt', 'utf-8');

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req ,res, next) => {
//     if(!req.session.user) {
//         next();
//     } else {
//         User.findById(req.session.user._id)
//         .then(user => {
//             req.user = user;
//             next();
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// });

app.use(authRoutes);

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });