const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
const db= mongoose.connection;
db.on('error', console.error.bind("error in connecting to the db"));
db.once('open', function()
{
    console.log("successfully connected to the db");
})

module.exports= db;







