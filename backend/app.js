const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const postComment = require('./routes/comment');
const likeComment = require('./routes/like');
const dotenv = require("dotenv");
dotenv.config();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//* - любой адрес для подключения
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', postComment);
app.use('/api/like', likeComment);

module.exports = app;