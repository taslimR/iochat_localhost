var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
app.engine('html', require('ejs').renderFile);
//users = [];
connections = [];

var session_use = "";
var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'iochat'

});
var rows_das = [];
connection.connect(function (error){
	if(!!error){
		console.log('Error');
	}
	else{
		console.log('connected to mysql');
	}
});
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(path.join(__dirname, 'public/give_help')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: " me[t45ot6ripo74yh474",
	resave: false, 
	saveUninitialized: true
}));

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

// app.post("/api/Upload", function (req, res) {
    
// });

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get('/', function(req,res){
	
	//res.sendFile(__dirname + '/index.html');
	res.render('index.html');
});
app.post('/', function(req,res){
		
			
			//console.log('SUCESS!!\n');
			//console.log(rows);
			//session_use = req.body.user;
			//console.log(req.body.user+" "+req.body.pass);
		connection.query("SELECT * FROM users WHERE email = '"+req.body.user+"' and password = '"+req.body.pass+"'", function(error,rows,fields){
		if(rows == ""){
			res.redirect('/');
			console.log('Error in the query!');
		}
		else{
			//session = req.session;
			console.log('SUCESS!!\n');
			rows_das = rows;
			session_use = req.body.user;
			console.log(session_use);
			console.log(rows);
			//console.log(req.body.user+" "+req.body.pass);
			//if(req.body.user == rows[0].username && req.body.pass == rows[0].password){
				
				
				res.render('index2.html',
				    {t1: req.session.req.body.user}
				);
				// res.render('/public/index2.html',{
				//     name:req.session.req.body.user
				// });
			//}
		}
	});
});

//logout
app.get('/logout',(req, res) =>{
	console.log(session_use);
	req.session.destroy();
	session_use = "";
	console.log('destroyed');
	console.log(session_use);
	res.redirect('/');
});

//login
app.get('/login',(req,res) => {
	if(session_use){

		res.render('login.html',{t1: req.session.session_use});
		
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//registration
app.get('/registration',(req,res) => {
	if(session_use){
		res.render('registration.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

app.post('/reg_val',(req,res) => {
	if(session_use){
		//res.render('registration.html',{t1: req.session.session_use});
		connection.query("INSERT INTO `users`( `name`, `username`, `email`, `password`, `first_name`, `last_name`, `gender`, `help_as`, `experties`, `skills`, `url_for_user`, `color_body_font`, `color_scheme_menu`, `color_scheme_active`, `color_scheme_font`, `background_image`) VALUES ('user','"+req.body.username+"','"+req.body.email+"','"+req.body.password+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.gender+"','"+req.body.selecthelpas+"','"+req.body.selectexperties+"','"+req.body.selectskills+"','"+req.body.url+"','"+req.body.color_body_font+"','"+req.body.color_scheme_menu+"','"+req.body.color_scheme_active+"','"+req.body.color_scheme_font+"','"+req.body.background_image+"')", function(error,rows,fields){
			if(!!error){
				console.log('Error in the query!');
			}
			else{
				//session = req.session;
				console.log('SUCESSFULLY Inserted!!\n');
				session_use = req.body.email;
				console.log(session_use);
				console.log(rows);
				rows_das = rows;
				//console.log(req.body.user+" "+req.body.pass);
				//if(req.body.user == rows[0].username && req.body.pass == rows[0].password){
					res.render('dashboard.html',
				    {	
				    	t1: req.session.req.body.username ,
				    	user_email: req.session.req.body.email,
				    	font_body: req.session.req.body.color_body_font , 
				    	bg_color: req.session.req.body.color_scheme_menu , 
				    	active_color: req.session.req.body.color_scheme_active, 
				    	font_color: req.session.req.body.color_scheme_font , 
				    	bgi: req.session.req.body.background_image
				    }
				);
				//}
			}
		});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

app.post('/set_changes',(req,res) => {
	if(session_use){
		//res.render('registration.html',{t1: req.session.session_use});
		upload(req, res, function (error1) {
	        if (error1) {
	            console.log("Something went wrong!");
	        }
	        console.log("File uploaded sucessfully!.");
    	});
		connection.query("UPDATE `users` SET `color_body_font`='"+req.body.color_body_font+"',`color_scheme_menu`='"+req.body.color_scheme_menu+"',`color_scheme_active`='"+req.body.color_scheme_active+"',`color_scheme_font`='"+req.body.color_scheme_font+"',`background_image`='"+req.body.background_image+"' WHERE email = '"+rows_das[0].email+"'", function(error,rows,fields){
			if(!!error){
				console.log('Error in the query!');
			}
			else{
				//session = req.session;
				console.log('SUCESSFULLY Inserted!!\n');
				//session_use = req.body.username;
				console.log(session_use);
				console.log(rows);
				//rows_das = rows;
				//console.log(req.body.user+" "+req.body.pass);
				//if(req.body.user == rows[0].username && req.body.pass == rows[0].password){
					res.render('theme.html',
				    {	
				    	t1: rows_das[0].username ,
				    	user_email: rows_das[0].email,
				    	font_body: req.session.req.body.color_body_font , 
				    	bg_color: req.session.req.body.color_scheme_menu , 
				    	active_color: req.session.req.body.color_scheme_active, 
				    	font_color: req.session.req.body.color_scheme_font , 
				    	bgi: req.session.req.body.background_image
				    }
				);

				connection.query("SELECT * FROM users WHERE email = '"+rows_das[0].email+"'", function(error1,rows1,fields1){
					console.log(rows1);
					rows_das = rows1;
				});
				//}
			}
		});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});
//give_help
app.post('/give_help',(req,res) => {
	if(session_use){
		// res.render('dashboard.html',{t1: req.session.session_use});
		console.log(req.body.user_email+'\n');
		console.log(req.body.user_pass);
		connection.query("SELECT * FROM users WHERE email = '"+req.body.user_email+"' and password = '"+req.body.user_pass+"'", function(error,rows,fields){
			if(rows == ""){
				res.redirect('/login');
				console.log('Error in the query!');
			}
			else{
				//session = req.session;
				console.log('SUCESS!!\n');
				session_use = req.body.user_email;
				console.log(session_use);
				console.log(rows);
				//console.log(req.body.user+" "+req.body.pass);
				//if(req.body.user == rows[0].username && req.body.pass == rows[0].password){
					console.log(rows[0].username +" , "+ rows[0].color_scheme_menu +" , "+ rows[0].color_scheme_active +" , "+ rows[0].color_scheme_font+" , "+ rows[0].background_image);
					rows_das = rows;
					res.render('dashboard.html',
				    {	
				    	t1: rows[0].username ,
				    	user_email: rows[0].email,
				    	font_body: rows[0].color_body_font , 
				    	bg_color: rows[0].color_scheme_menu , 
				    	active_color: rows[0].color_scheme_active, 
				    	font_color: rows[0].color_scheme_font , 
				    	bgi: rows[0].background_image
				    });
					// res.render('/public/index2.html',{
					//     name:req.session.req.body.user
					// });
				//}
			}
		});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//dashboard
app.get('/dashboard',(req,res) => {
	if(session_use){
		res.render('dashboard.html',
				    {	
				    	t1: rows_das[0].username , 
				    	user_email: rows_das[0].email,
				    	font_body: rows_das[0].color_body_font ,
				    	bg_color: rows_das[0].color_scheme_menu , 
				    	active_color: rows_das[0].color_scheme_active, 
				    	font_color: rows_das[0].color_scheme_font , 
				    	bgi: rows_das[0].background_image
				    });
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

app.get('/adv_profile', (req, res) => {
	if(session_use){
    	res.render('adv_profile.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to home
app.get('/home', (req, res) => {
	if(session_use){
    	res.render('index2.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to give_help
app.get('/inbox', (req, res) => {
	if(session_use){
    	res.render('inbox.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to get_help
app.get('/get_help', (req, res) => {
	if(session_use){
    	res.render('conversation.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to user list
app.get('/user_list', (req, res) => {
	if(session_use){
    	res.render('user_list.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to important
app.get('/important', (req, res) => {
	if(session_use){
    	res.render('important.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}

});

//redirect to trash
app.get('/trash', (req, res) => {
	if(session_use){
    	res.render('trash.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to theme
app.get('/theme', (req, res) => {
	if(session_use){
		console.log(rows_das);
    	res.render('theme.html',
				    {	
				    	t1: rows_das[0].username , 
				    	user_email: rows_das[0].email,
				    	font_body: rows_das[0].color_body_font ,
				    	bg_color: rows_das[0].color_scheme_menu , 
				    	active_color: rows_das[0].color_scheme_active, 
				    	font_color: rows_das[0].color_scheme_font , 
				    	bgi: rows_das[0].background_image
				    });
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to coaching
app.get('/coaching', (req, res) => {
	if(session_use){
    	res.render('coaching.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to dream
app.get('/dream', (req, res) => {
	if(session_use){
    	res.render('dream.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to goal
app.get('/goal', (req, res) => {
	if(session_use){
    	res.render('goal.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to goal_builder
app.get('/goal_builder', (req, res) => {
	if(session_use){
    	res.render('goal_builder.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});


//redirect to not
app.get('/not', (req, res) => {
	if(session_use){
    	res.render('not.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to profile
app.get('/profile', (req, res) => {
	if(session_use){
    	res.render('profile.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to task
app.get('/task', (req, res) => {
	if(session_use){
    	res.render('task.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//redirect to working
app.get('/working', (req, res) => {
	if(session_use){
    	res.render('working.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 3014);
console.log('server running....');


io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log("connected: %s sockets connected", connections.length);

	//Disconnect
	socket.on('disconnect',function(){
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnected: %s sockets connected", connections.length);
	});
	

	//send message
 	socket.on('send message', function(data,data2){
  		console.log(data);
  		console.log(data2);
  		io.sockets.emit('new message',{msg: data, user: data2});
 	});

});
