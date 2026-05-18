const express = require('express');

const app = express();
app.use(express.json());

const userRoute = require('./routes/user.route');

app.use('/api/users', userRoute);

module.exports = app;
