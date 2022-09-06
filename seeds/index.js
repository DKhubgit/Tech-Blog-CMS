const sequelize = require('../config/config');
const Posts = require('../model/Posts');
const Comments = require('../model/Comments');
const User = require('../model/User');

async function sync() {

    await Posts.sync();

    await Comments.sync();

    await User.sync();

    process.exit(0);
}

sync();

