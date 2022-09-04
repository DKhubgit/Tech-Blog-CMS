const express = require('express');
const session = require('express-session'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req,res) => {
    console.log('Server Established!');
})