var express = require('express');
const User = require('../models/User');
var app = express.Router();

app.get("/", async (req, res) => {
    if(req.query.msg){
        res.locals.msg = req.query.msg
    }
    res.render('create')
});

app.post('/create-account', async function(req, res, next) {
    try {
        await User.create(
        {
            username: req.body.username,
            password: req.body.password,
            level: req.body.level
        }
    )
    res.redirect('/?msg=success')
    } catch (error) {
        res.redirect('/create?msg=fail') 
    }
});

module.exports = app;