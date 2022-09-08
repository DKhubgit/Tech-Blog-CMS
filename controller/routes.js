const router = require('express').Router();
const Posts = require('../model/Posts');
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.get('/', async (req,res) => {
    try {
        const posts = await Posts.findAll();
        const newPosts = posts.map((item) => item.get({plain: true}));
        
        res.status(200).render('homepage', { newPosts });
    } catch (err) {
        res.status(401).json(err);
    }
})

module.exports = router;