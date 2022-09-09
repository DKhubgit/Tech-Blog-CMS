const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.get('/', (req,res) => {
    res.render('login');
})

router.post('/', async (req,res) => {
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

module.exports = router;