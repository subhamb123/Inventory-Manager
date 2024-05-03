var express = require('express');
const User = require('../models/User');
const Item = require('../models/Item');
var app = express.Router();

app.get("/", async (req, res) => {
    const items = await Item.findAll();
    if(req.query.msg){
        res.locals.msg = req.query.msg
    }
    res.render('index', { loggedInUser: req.session.user, items });
});

app.get("/checkout/:id", async function(req, res, next) {
  try {
    await Item.update(
      { owner: req.session.user.username },
      { where: { id: req.params.id } }
    )
    res.redirect('/?msg=success')
  } catch (err) {
    res.redirect('/')
  }
})

app.get("/return/:id", async function(req, res, next) {
  try {
    await Item.update(
      { owner: '', alert: 'F' },
      { where: { id: req.params.id } }
    )
    res.redirect('/?msg=returned')
  } catch (err) {
    res.redirect('/')
  }
})

app.get("/alert/:id", async function(req, res, next) {
  try {
    await Item.update(
      { alert: 'T' },
      { where: { id: req.params.id } }
    )
    res.redirect('/?msg=alerted')
  } catch (err) {
    res.redirect('/')
  }
})

app.post('/login', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = await User.findUser(req.body.username, req.body.password)
    if(user!== null){
      req.session.user = user
      res.redirect("/")
    }else{
      res.redirect("/?msg=invalid")
    }
});
  
app.get('/logout', function(req,res, next){
    req.session.destroy()
    res.redirect("/")
})

module.exports = app;