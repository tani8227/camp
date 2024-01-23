const Interview = require('../models/interview');
const Std = require('../models/Student')

// render interview page 
module.exports.interviewpage = async function (req, res) {

    if (req.isAuthenticated()) {

        const interviewlist = await Interview.find({result:{$ne:"Pass"}});
        // console.log(interviewlist)
        if(interviewlist){ 
            // console.log("helloppp")
        return res.render('interview',
            {
                interviewl_ist: interviewlist,
                title:"interview",

            });
        }
    } else {
        return res.redirect('/employees/signin');
    }
}

// create the interview for the students
module.exports.create = async function (req, res) {
    try {

        if (req.isAuthenticated()) {

            // finding the Student id from the stdschema and storing its reference in interviewchema by stdref=student,id     
            const Student = await Std.findOne({ stdname: req.body.interviewee })

            // console.log(Student.id);

            if (Student) {
                const Inverviewcreated = await Interview.create(
                    {
                        _id:Student.id,
                        interviwee: req.body.interviewee,
                        company:req.body.company,
                        date: req.body.date,
                        result: req.body.result,
                        emplyref: req.user._id,
                        stdref: Student,
                    })




                if (!Inverviewcreated) {
                    // console.log("interview not created");
                    return res.redirect('back')
                } else {
                    // console.log("interview  created");
                    return res.redirect('back')
                }
            }
            else {
                return res.status(500).send("invalid student")
            }
        }
        {
            return res.redirect('/employees/signin');
        }
    }
    catch (err) {
        console.log("error in creating the interview");
        return res.status(500).send('Error');
    }
}


// mark the interview result 

module.exports.markinterviewresult= async function(req, res)
{
    // console.log(req.body);
    const studentId=req.body.stdref;
    try{ 
    if(req.isAuthenticated())
    {
        const student= await Std.findOne({_id:studentId})
        if(student){ 
            // console.log("std--->", student);
            const interview_std = await Interview.findOne({stdref:studentId});
          
            // console.log("interview_std--->", interview_std);
          
       
        const update_interview= await Interview.findByIdAndUpdate(
            { 
                _id:interview_std.id,
            },

            {
                result:req.body.mark,
            },

            {
                 new: true 
            })
          

         
            if(update_interview)
            {
               
                if(update_interview.result=="Pass"){ 

                    const update_Student= await Std.findByIdAndUpdate(
                        {
                           _id:interview_std.id,
                        },

                        {
                            status:"Placed",
                        },

                        {
                           new : true,
                        })

                        if(update_Student){ 
                                //   console.log("updated student");  
                        }
                        
                        
                //   console.log("updated interview");  
                    
                } 
               
                return res.redirect('back')   
            }else
            {
                console.log("error in updating"); 
                return res.status(500).send('error in updating');  
            }
            
        }else
        {
            console.log("student not found ");
            return res.status(500).send('student not found');  
        }
        
    }
    {
        return res.redirect('/employees/signin');
    }
}catch(err)
{
    return res.status(500).send('error');
}
 

}
