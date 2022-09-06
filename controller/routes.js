const router = require('express').Router();
const Posts = require('../model/Posts');
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.get('/', async (req,res) => {
    try {
        const posts = await Posts.findAll();
        const newPosts = posts.map((item) => item.get({plain: true}));
        // console.log(newPosts);
        
        res.status(200).render('homepage', { newPosts });
    } catch (err) {
        res.status(401).json(err);
    }
})

router.get('/login', (req,res) => {
    res.render('login');
})

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            }
        })
        const newData = userData.get({plain: true})
        // if (!newData) {
        //     res.render('login', {messages: 'Username or Password is Incorrect!'})
        // }
        console.log(newData)
        const verify = await bcrypt.compare(req.body.password, newData.password);
        if (verify) {
            //record them logged in
            res.redirect('/');
        } else {
            res.render('login', {messages: 'Username or Password is Incorrect!'})
        }
    } catch (err) {
        console.log(err)
        res.render('login', {messages: 'Username or Password is Incorrect!'})
    }
})

router.get('/signup', (req,res) => {
    res.render('signup');
})

router.post('/signup', async (req,res) => {
    try {
        const userData = {username: req.body.username, password: req.body.password};
        await User.create(userData);
        res.status(200).redirect('/login');
    } catch (err) {
        res.render ('signup', {messages: "Did not meet the criteria."});
    }
})

router.get('/dashboard', async (req,res) => {

    try {
        const posts = await Posts.findAll({
            where: {
                creator: 'DanielK',
            }
        })
        const newPosts = posts.map((item) => item.get({plain: true}));
        // console.log(newPosts);
        
        res.status(200).render('dashboard', { newPosts });
    } catch (err) {
        res.status(401).json(err);
    }

})

router.post('/dashboard', async (req,res) => {
    let data;
    try {
        const newTitle = req.body.title;
        const newContent = req.body.content;
        const newCreator = 'DanielK'; //must change to whoever is logged in, placeholder for now
        data = {title: newTitle, content: newContent, creator: newCreator};
        await Posts.create(data);
        // res.status(200).json(data);
        res.status(200).redirect('/dashboard');
    } catch (err) {
        res.status(401).json(err);
    }
})

router.put('/dashboard', (req,res) => {
    
})

module.exports = router;