const router = require('express').Router();
const User = require('../model/User');

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