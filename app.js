const express = require('express');
const db = require('./Conf/dbConf');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

db.authenticate().then(() => {
    console.log('Database connected..');
}).catch(err => {
    console.log('Database can not connect; ' + err)
});

db.sync();////{force:true}modellerle tablo olusturur
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*',);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
/*
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
*/
app.use('/',require('./Route/routes'));


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