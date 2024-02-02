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
                interview_list: interviewlist,
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
            
            const Student = await Std.findOne({ std_uid: req.body.stduid})

            // console.log(Student);

            if (Student) 
            {
                // console.log(Student.id);
                // console.log(Student.stdname);
                // console.log(Student.coursescore);
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
                    req.flash('error', "error in creating the interview !!!")
                    return res.redirect('back')
                } else {
                    // console.log("interview  created");
                    req.flash('success', " interview not created successfully !!!")
                    return res.redirect('back')
                }
            }
            else {
                req.flash('error', "student does not existed !!!")
                
                return res.redirect('back')
            }
        }
        {
            req.flash('error', "user is unauthorized !!!")
            return res.redirect('/employees/signin');
        }
    }
    catch (err) {
        console.log("error 56 58in creating the interview");
        
        req.flash('error', "student is not eligible for interview !!!")
        return res.redirect('back')
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
                                req.flash('success', " student marked successfully !!!")
                        }
                        
                        
                //   console.log("updated interview");  
                    
                } 
               
                return res.redirect('back')   
            }else
            {
                console.log("error in updating"); 
                req.flash('error', " error in marked !!!")
                return res.redirect('back');  
            }
            
        }else
        {
            console.log("student not found ");
            req.flash('error', "student not found !!!")
            return res.redirect('back');   
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
