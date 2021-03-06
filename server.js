const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

// DB Config
const db  = require('./config/keys').mongoURI;
// connect to mongo db with mongoose
mongoose.connect(db , { useNewUrlParser: true }).then(()=> console.log('Mongo db is connnected to server')).catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport )

// Use  Routes
app.use('/api/users' , users);
app.use('/api/posts' , posts);
app.use('/api/profile' , profile);


const port = process.env.PORT || 5000;
app.listen(port , ()=>{
  console.log(`Server is running on port ${port}`)
});