
const Std= require('../models/Student')
const Emply= require('../models/emply')
module.exports.create= async  function(req, res)
{
 
   
   const std= await  Std.create(
        {
          stdname:req.body.stdname,
          college: req.body.college,  
          batch:req.body.batch,
          course:req.body.course,
          coursescore:req.body.coursescore,
          status:req.body.status,
          eligibleforinterview:req.body.eligibleforinterview,
          emplyref:req.user._id,
          
        });
         if(std){ 
        //    console.log(std.);
         }
        return res.redirect('/');
}


// destroy the stdudent or delete the student 

module.exports.destroy= async function(req, res)
{   

  const id = req.query.id.trim();

    try{ 
        
      // findbyId return the object instead of id.
        const std = await Std.findById(id);

  
  if(std){ 
  
      // console.log(std)
      // console.log(idx)
      // console.log(req.user._id)
      if(std.emplyref==req.user.id)
      {
             
        // console.log(std.emplyref)
        // console.log(req.user._id)
            
           const delete_std= await Std.findByIdAndDelete(id);
           if(delete_std){ 
            console.log("deleted")
           return res.redirect('/');
           }else
           {
            console.log("not deleted")
           }
      }else
      {
        console.log(" id found but not matching with the user who post it ")
        return res.redirect('back');
      }

  }
}
  catch(err)
  {
    // console.log(id);
    console.error(err);
    return res.status(500).send('Error');
  } 
}




