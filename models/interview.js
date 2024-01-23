const mongoose = require('mongoose');
const interviewScheam= new mongoose.Schema(
    {
        interviwee:
        {
            type : String,
            required: true,
        },
        date:
        {
           type:Date,
           required: true,
        },

        company:
        {
            type:String,
            required:true,
        },
        result:
        {
            type:String,
            enum:[,'Pass','Fail','on hold','did not Attempt'],
            required: true,
        },
        emplyref:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Emply',
        },
        stdref:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Std',
        }

    },
    {
        timestamps: true,
    })

    const Inverview= mongoose.model('Interview', interviewScheam);
    module.exports= Inverview;