const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//@route GET api/posts/test
//@desc  Test posts route
//@access public

router.get('/test' , (req , res) => res.json({msg : 'post works'}));


//@route GET api/posts
//@desc GET POST
//@access public

router.get('/' , (req , res) =>{
  Post.find().sort({date : -1})
  .then((posts) => res.json(posts))
  .catch( err => res.status(404).json({notFound : 'post not found'}));
});
//@route GET api/posts/:id
//@desc GET POST by id
//@access public

router.get('/:id' , (req , res) =>{
  Post.findById(req.params.id).sort({date : -1})
  .then((post) => res.json(post))
  .catch( err => res.status(404).json({notFound : 'post not found'}));
});

//@route POST api/posts
//@desc create new post
//@access private

router.post('/' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  console.log(req.header)
  const newPost = new Post({
    text : req.body.text,
    name : req.body.name,
    avatar : req.body.name,
    user : req.user.id
  });
  newPost.save().then(post => res.json(post)).catch((err) => res.json({post : 'post not created'}))
});


//@route DELETE api/posts/:id
//@desc delete  post
//@access private
router.delete('/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  Profile.findOne({user : req.user.id})
  .then((profile) =>{
    Post.findById(req.params.id)
    .then((post)=>{
      //check for post owner
      if(post.user.toString() !== req.user.id){
        return res.status(401).json({notauthorized : 'user not authorized'});
      };
      //Delete
      post.remove().then(() => res.json({success : true}))
    })
    .catch(err => res.status(404).json({notfound : 'post not found'}));
  });
});

//@route POST api/posts/like/:id
//@desc like post
//@access private
router.post('/like/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  Profile.findOne({user : req.user.id})
  .then((profile) =>{
    Post.findById(req.params.id)
    .then((post)=>{
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({alreadyliked : 'user already liked'});
      }
      //add user id to the likes array
      post.likes.unshift({user : req.user.id});
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({notfound : 'post not found'}));
  });
});

//@route POST api/posts/unlike/:id
//@desc UNLIKE post
//@access private
router.post('/unlike/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  Profile.findOne({user : req.user.id})
  .then((profile) =>{
    Post.findById(req.params.id)
    .then((post)=>{
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({notliked : 'you have not like the post yet'});
      }
      //GET remove like
      const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user.id); 

      //splice out of array
      post.likes.splice(removeIndex , 1);

      //save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({notfound : 'post not found'}));
  });
});

//@route POST api/posts/comment/:id
//@desc add comment to post
//@access private
router.post('/comment/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  Post.findById(req.params.id)
  .then(post => {
    const newComment = {
      text : req.body.text,
      name : req.body.name,
      avatar : req.body.avatar,
      user : req.user.id
    }
    //add to comment array
    post.comments.unshift(newComment);

    //save the comment
    post.save().then(post => res.json(post));
  }).catch(err => res.status(401).json({postnotfound : 'post not found'}))

});

//@route POST api/posts/comment/:id/:comment_id
//@desc remove comment from post
//@access private
router.delete('/comment/:id/:comment_id' , passport.authenticate('jwt' , {session : false}) , (req , res) =>{
  Post.findById(req.params.id)
  .then(post => {
    //check to see if comment exist
    if(post.comments.filter(comment => comment._id.toString() === req.paramms.comment_id).length === 0) {
      return res.status(404).json({commentnotexist : 'comment not exist'})
    }

    //GET removeIndex
    const removeIndex = post.comments
    .map(item => item._id.toString())
    .indexOf(req.params.comment_id)

    //splice comment out of array
    post.comments.splice(removeIndex , 1);
    post.save().then(post => res.json(post));

  }).catch(err => res.status(401).json({postnotfound : 'post not found'}))

});


module.exports = router;