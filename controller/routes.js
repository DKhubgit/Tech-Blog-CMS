const router = require('express').Router();
const Posts = require('../model/Posts');

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

router.get('/signup', (req,res) => {
    res.render('signup');
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