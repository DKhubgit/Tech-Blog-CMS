const sequelize = require('../config/config');
const Posts = require('../model/Posts');
const Comments = require('../model/Comments');

async function sync() {

    await Posts.sync();

    await Comments.sync();

    process.exit(0);
}

sync();

