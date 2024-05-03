const express = require('express');
const path = require('path');
var createError = require('http-errors');
const session = require('express-session')
const sequelize = require('./db')

const app = express();
var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', indexRouter);
app.use('/create', createRouter);

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

sequelize.sync().then(()=>{
  console.log("Sequelize Sync Completed...");
})

app.listen(3000, () => {
    console.log("server started in port 3000");
});

module.exports = app;