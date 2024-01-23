
const fs = require('fs');
const csv = require('fast-csv');
const Std = require('../models/Student');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    // if(req.isAuthenticated())

    if (req.isAuthenticated()) {
        const std = await Std.find({ coursescore: 'Nill' }).populate('emplyref').exec();
        if (std) {
            // for(let i of std)
            // {
            //     console.log(i.emplyref)
            // }
            return res.render('home',
                {

                    std: std,
                    title: "home"
                });
        } else {
            return res.render('home');
        }
    } else {
        return res.redirect('/employees/signin');
    }
}



module.exports.downloadCSV = async function (req, res) {
    if (req.isAuthenticated())
    {
       try {
               const std = await Std.find({});

                if (std) 
                {
                  
                    const csvData = [];

                    for (let student of std) 
                    {
                        // console.log(student)
                        // Assuming you have properties like name, age, etc. Adjust accordingly
                        const data = {
                            stdname: student.stdname,
                            college: student.college,
                            batch: student.batch,
                            course: student.course,
                            coursescore: student.coursescore,
                            status: student.status,
                            eligibleforinterview: student.eligibleforinterview,

                        };

                        csvData.push(data);
                    };
                    
                    const csvStream = csv.format({ headers: true });
                    const writableStream = fs.createWriteStream('students.csv');
                  
                   


                    writableStream.on('finish', function () {
                        console.log('CSV file has been written successfully.');
                    });
                   
                   

                    csvStream.pipe(writableStream);
                    // console.log(csvStream)
                    csvData.forEach((data) => csvStream.write(data));
                    csvStream.end();

                    return res.download('students.csv');
                } 
                else 
                    {
                        return res.render('home');
                    }
            } 
            catch (error) 
            {
                console.error('Error generating CSV:', error);
                return res.render('home');
            }
    }
    else 
    {
        return res.redirect('/employees/signin');
    }
};