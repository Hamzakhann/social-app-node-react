const express = require('express');
const router = express.Router();


//@route GET api/posts/test
//@desc  Test posts route
//@access public

router.get('/test' , (req , res) => res.json({msg : 'post works'}));

module.exports = router;