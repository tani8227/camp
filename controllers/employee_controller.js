const Emply= require('../models/emply');
const Std= require('../models/Student')
// render the emply profile 
module.exports.profile= async function(req , res)
{
    
    if(req.isAuthenticated())
    { 
       

        const oldStudentsList = await Std.find({eligibleforinterview:'Eligible', status:{$ne :'Placed'}});
    
       
     
        return res.render('emply_profile',
        {
            old_student_list:oldStudentsList,
            title:"profile",
        })
    }else
    {
        return res.redirect('/employees/signin');
    }
}





// rendered the sign up page
module.exports.signUp= function(req, res)
{
   if(!req.isAuthenticated())
   {
    return res.render('signup');
   }else
   {
    return res.redirect('/employees/profile');
   }

}



// rendered the signin page 
module.exports.signIn= function(req, res)
{
    if(req.isAuthenticated())
    { 
        return res.render('emply_profile')
    }else
    {
        return res.render('signin');
    }
}

// create the session for the employee
module.exports.create= async function(req, res)
{
    // console.log("jj")
    const emply= await Emply.findOne({email: req.body.email});
    if(emply)
    {
        req.flash('error', " employee is  already existed !!!")
        return res.redirect('/employees/signin');
    }else
    {
      const emply = await  Emply.create(
            {
               name:req.body.name,
               email:req.body.email,
               password:req.body.password,   
            });

            if(emply)
            { 
                console.log("emply is created");
                req.flash('success', " employee is  created !!!")
                return res.redirect('/employees/signin')

            }else
            { 
                req.flash('error', " error in creating employee !!!")
                console.log("error in creating emply");
            }
    }
}


// create the session for the emply to kept the cookie 

module.exports.createSession= async function(req , res)
{
        req.flash('success', " loged in successfully !!!")

        // console.log(req.flash('success'));
      return res.redirect('/');
}

// logout the user or destroyed the session for user 
module.exports.destroySession= async function(req, res)
{
    
    req.flash('success', " loged out successfully !!!" )
    //  console.log(req.flash('success'));
    
 req.logout(function(err)
 {
    if(err)
    {
        console.log("error in logging out !!!")
        req.flash('error', "error in logging out !!!");
        return res.redirect('back')
    }
   
      
        req.flash('success', "logged out successfully !!!");
        return res.redirect('/');
 })


}