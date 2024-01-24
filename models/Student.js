const mongoose = require('mongoose');
const StudentSchema= new mongoose.Schema(
    {
        stdname:
        {
            type:String,
            required:true,
        },
        college:
        {
            type : String,
            required:true,
        },

         batch:
        {
            type:String,
            required:true
        },
        course:
        {
            type:String,
            enum: ['DSA', 'WebDev', 'React'],
            required:true,
        },
        coursescore:
        {
            type:String,
            enum: ['75%', '85%', '95%', 'Nill'],
            required:true,
        },
        status:
        {
            type:String,
            enum: ['Not Applicable','Placed', 'Not Placed'],
            required:true,
        },
        eligibleforinterview:
        {
           type: String,
           enum:['Not Eligible','Eligible'],
           required:true,
        },
        emplyref:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Emply',
        },

        std_uid:
        {
            type:String,
            
        
        }
       
    },
    {
        timestamps:true,
    })

    const Std= mongoose.model('Std', StudentSchema);
    module.exports=Std;