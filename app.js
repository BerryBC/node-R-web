var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var multer = require('multer');
var handleR = require('./handleR/handleR')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var upload = multer({ dest: path.join(__dirname, 'tmpCSV') });

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

app.post('/uploadcsv', upload.any(), function (req, res) {
	var fileUL = req.files[0];
	var fileNameArr = fileUL.originalname.split('.');
	var strSuffix = fileNameArr[fileNameArr.length - 1];

	if (strSuffix.toLowerCase() == 'csv') {
		var strNewFile = path.join(__dirname, './tmpCSV/' + (new Date().valueOf()) + '-' + fileUL.originalname);
		fs.renameSync(path.join(__dirname, './tmpCSV/' + fileUL.filename), strNewFile);
		var objPara = { csv: strNewFile, at: req.body.at, para: JSON.parse(req.body.para) };
		handleR(objPara, res);

	} else {
		res.send({ message: 'Error', re: '上传文件不为CSV。' });
	};
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
module.exports = app;
