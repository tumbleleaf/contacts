var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var contacts = require('./modules/contacts');
var http = require('http');
var url = require('url');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use('/',routes);
//app.use('/users',users);

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env')==='development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/
app.get('/contacts',
        function(request, response){
            var get_params = url.parse(request.url,
            true).query;

            if (Object.keys(get_params).length === 0)
            {
                response.setHeader('content-type',
                'application/json');
                response.end(JSON.stringify
                (contacts.list()));
            }
            else
            {
                response.setHeader('content-type',
                'application/json');
                response.end(JSON.stringify
                (contacts.query_by_arg(get_params.arg,
                get_params.value)));
            }
        }
);

app.get('/contacts/:number', function(request, response) {
    response.setHeader('content-type','application/json');
    response.end(JSON.stringify
    (contacts.query(request.params.number)));
});

app.get('/groups', function(request, response) {
    console.log ('groups');
    response.setHeader('content-type',
    'application/json');
    response.end(JSON.stringify(contacts.list_groups()));
});

app.get('/groups/:name', function(request, response) {
    console.log ('groups');
    response.setHeader('content-type',
    'application/json');
    response.end(JSON.stringify
    (contacts.get_members(request.params.name)));
});
/*
http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});
*/

module.exports = app;
