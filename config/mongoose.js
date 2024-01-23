const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://tarun:tarun@cluster0.u9ylti1.mongodb.net/emply?retryWrites=true&w=majority');
const db= mongoose.connection;
db.on('error', console.error.bind("error in connecting to the db"));
db.once('open', function()
{
    console.log("successfully connected to the db");
})

module.exports= db;







