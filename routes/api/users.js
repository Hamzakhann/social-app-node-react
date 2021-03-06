const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
// load user model
const User = require('../../models/User');

//@route GET api/users/test
//@desc  Test users route
//@access public
// router.get('/test' , (req , res) => res.json({msg : 'user works'}));



//@route POST api/users/registeration
//@desc  Register user
//@access public
router.post('/register' , (req , res)=>{
  console.log(req.body)
  User.findOne({email : req.body.email}).then((user)=>{
    if(user){
      return res.status(400).json({email : 'email already exist'});
    }else {
      const avatar = gravatar.url(req.body.email , {
        s : '200', //size
        r : 'pg', //Rating
        d : 'mm' //Default
      });
      const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        avatar,
        password : req.body.password
      })
    
      bcrypt.genSalt(10 , (err , salt)=>{
        bcrypt.hash(newUser.password , salt , (err , hash)=>{
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then((user)=> res.json(user))
          .catch(err => res.status(400).json({err}))
        });

      });


    }

  })
});



//@route POST api/users/login
//@desc  login user and return jwt token to the user
//@access public

router.post('/login' , (req , res) =>{
  const email = req.body.email;
  const password = req.body.password
  console .log(email , password)
  //find user by email
  User.findOne({email})
  .then((user)=>{
    //check for user
    if(!user){
      return res.status(404).json({email : 'User not found'})
    }
    //check password
    bcrypt.compare(password , user.password)
    .then((isMatch)=>{
      if(isMatch){
        //user matched
        const payload = {id : user.id , name : user.name , avatar  : user.avatar} //crete jwt payload
        //Sign token
        jwt.sign(payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err , token) =>{
            res.json({
              success : true,
              token : 'Bearer ' + token
            });
          });
      }else{
        return res.status(400).json({password : 'password incorrect'})
      }
    });


  });
});

//@route GET api/users/current
//@desc  Return current user
//@access private

router.get('/current' , passport.authenticate('jwt' , {session : false}) , (req , res)=>{
  res.json({
    id : req.user.id,
    name : req.user.id,
    email : req.user.email 
  });
});

module.exports = router;