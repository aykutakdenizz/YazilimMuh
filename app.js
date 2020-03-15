const express = require('express');
const db = require('./Conf/dbConf');
const port = process.env.PORT || 8000;
const { assign_emp_to_project,auto_set_salary,create_project,start_project,finish_project,show_employees,show_projects} = require('./Controller/Controllers');
const Manager = require('./Models/Manager');
const Designer = require('./Models/Designer');
const Project = require('./Models/Project');
const app = express();


db.authenticate().then(() => {
    console.log('Database connected..');
}).catch(err => {
    console.log('Database can not connect; ' + err)
});

db.sync();//{force:true}//modellerle tablo olusturur

app.use('/hi', async (req, res, next) => {
    let Employee={type:'Designer',id:2};
    let project={id:4,name:'p1',despriction:'d1',min_emp: 5,max_emp: 10,max_analyst: 5,max_designer: 4,max_programmer: 3,max_tester: 2,max_maintenance: 1};
    //await assign_emp_to_project(Employee);
    //await auto_set_salary(new Designer({id:2,name:'aykut12',surname:'akdeniz12',active_project:null,accounting_type:1,salary:null,experience:'deneyim12'}));

    //await finish_project(await Project.findOne({where:{id:4}}));
    await show_employees();
    await show_projects();
    res.status(200);
    res.json({
        response: 'hi'
    })
});


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});
module.exports = app;