const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dailiesStateCheck = require('./utils/dailies-state-check');

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

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(3000, dailiesStateCheck);
    }).catch(err => {
        console.log(err);
    });