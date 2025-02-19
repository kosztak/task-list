const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const groupRoutes = require('./routes/group');

const taskStateCheck = require('./utils/task-state-check');

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/group', groupRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(3000, taskStateCheck);
    }).catch(err => {
        console.log(err);
    });