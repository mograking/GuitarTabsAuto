var createError = require('http-errors');
var childProcess = require('child_process');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/upload_data',function(req,res){
  
    console.log('POST parameter received are: ',req.body)
	
	var newsongid = crypto.randomBytes(10).toString('hex');


	tabpostfile = 'tab_' + newsongid.toString() + '.post';
	

    	filePath = __dirname + '/public/posttabs/tab_'+newsongid.toString() + ".post";
	console.log(filePath);

	filedata = "";

	for(var key in req.body){
 		if (req.body.hasOwnProperty(key)) {
    			item = req.body[key];
    			console.log(item);
			filedata += item[0].toString()+'-'+item[1].toString()+'-'+item[2].toString()+'\n';
  		}
	}
	console.log(filedata);

  	fs.writeFile(filePath,filedata,  function (err) {
  	if (err) throw err;
  	console.log('new tab request!');
		var pychild = require('child_process').exec('python python/guitabs_create.py '+tabpostfile);
		pychild.stdout.pipe(process.stdout)
		pychild.on('exit', function() {
	})

	});
	
    	res.redirect( '/'+'?songid='+newsongid)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
