const express = require('express'); 
const app = express(); 
const mysql = require('mysql');


var connection = mysql.createConnection({
  host: '34.132.3.201',
  user: 'root',
  password: 'basketball123',
  database: 'usersDB'
});

connection.connect(function(err){
    if(err){
        console.error('Connection Error Code: ' +err.stack);
        return;
    }
    console.log('Connection ID: '+ connection.threadId);
});



app.use(express.static('static'));

app.use(express.urlencoded({
    extended:true
}))

app.get('/sign-up', (req,res,next) => {
    let r = req.body;
    let rs=[];

    connection.query('SELECT*FROM Meeting', function(error,results,fields){
        let day = results[0].MeetingDay;
        let t1 = results[0].time1;
        let t2 = results[0].time2;
        let t3 = results[0].time3;
        let t4 = results[0].time4;
        let t5 = results[0].time5;
        let t6 = results[0].time6;
        let t7 = results[0].time7;
        let t8 = results[0].time8;
        let t9 = results[0].time9;
        let t10 = results[0].time10;
    res.send(`
    <html>
    <head>
        <title> Sign up </title>    
        <link rel= "stylesheet" href="main.css" />
        <style></style>
    </head>
    <center>
        <body id="all">
            <h1> Please type your name and select the ideal time for a meeting: </h1>

            <form method= 'post' action= '/register'>
            <label for= 'name'> Please Enter Your Name: </label>
            <input name = 'name' required>

            <div id= "containerContainer">
                <p> The meeting is on ${day}</p>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t1}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t1">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t2}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t2">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t3}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t3">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t4}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t4">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t5}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t5">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t6}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t6">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t7}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t7">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t8}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t8">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t9}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t9">
                </div>

                <div class = "timeContainer">
                    <label class = "timeLabel">${t10}</label>
                    <input type = "checkbox" id = "timeAvailable" name ="t10">
                </div>

                <input type= "submit" value="Submit" name ="userSubmitTimes">

            </form>
        </body>
    </center>
    </html>
        `);
    });
});

app.post('/login', function(req,res){
    let username= req.body.usr;
    let password= req.body.pwd;
    let message= "Access Denied";

    if(username=="admin" && password=="123"){
        res.redirect('/sign-up-form.html');
    }
    else{
        console.log(message);
        res.redirect('/index.html');
    }

});

app.post('/submit_meeting', function(req,res){
});

app.get('/view-meetings', function(req,res){
});

app.get('/resetDB', function(req,res){
    connection.query('TRUNCATE TABLE Meeting');
    connection.query('TRUNCATE TABLE GuestMeeting');
    console.log('Time relations have been reset');
    res.redirect('index.html');
});

app.post('/register', function(req,res){
    let r=req.body;
    let day;
    console.log(r.name);
    connection.query('SELECT * FROM Meeting', function(error,results,fields){
        day = results[0].MeetingDay;
    });

    let timeSlots=[]
    timeSlots[0]=r.t1||'off';
    timeSlots[1]=r.t2||'off';
    timeSlots[2]=r.t3||'off';
    timeSlots[3]=r.t4||'off';
    timeSlots[4]=r.t5||'off';
    timeSlots[5]=r.t6||'off';
    timeSlots[6]=r.t7||'off';
    timeSlots[7]=r.t8||'off';
    timeSlots[8]=r.t9||'off';
    timeSlots[9]=r.t10||'off';

    for(let i=0; i<timeSlots.length; i++){
        if(timeSlots[1]== 'on'){
            connection.query('INSERT INTO GuestMeeting VALUES($',{day},'$',{timeSlots},function(error,results,fields){
                if(error == null){
                    console.log("Update Guest Table");
                }
                else{
                    console.log(error);
                }
            });
        }
    }
});


  app.listen(8080);