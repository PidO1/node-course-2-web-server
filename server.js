const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use(function(req,res,next){

  var now = new Date().toString();
  var log = `${now} : ${req.method}, ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' ,log + '\n' ,(error)=>{if(error){console.log(error);}});
  next();
});

// app.use(function(req,res,next){
//
//   res.render('maintenence.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
app.get('/',function(req,res){
hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();});  //res.send('<h1>mr Eddals op  1 meter pipe</h1>');
  // res.send({
  //   name:'pido',
  //   like: ['games', 'gym']
  // });
  res.render('home.hbs',{PageTitle : 'Home page',
 welcomeMessage: 'Pssst i love uuu!!!!'});
});

app.listen(port,()=>{ console.log(`server is up on  port ${port}`)});

app.get('/about',(req,res)=>{

  res.render('about.hbs',{PageTitle : 'About page'
});

});
