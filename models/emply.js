const mongoose = require('mongoose');
const emplySchema= new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        email:
        {
            type:String,
            required:true,
        },
        password:
        {
            type:String,
            required:true,
        },

    },
    {
        timestamps: true,
    });

    const Emply= mongoose.model('Emply', emplySchema);
    module.exports=Emply;
