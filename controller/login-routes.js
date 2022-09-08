const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

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

module.exports = router;