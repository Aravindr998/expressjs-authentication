const express = require('express');
const sessions = require('express-session');
const app = express();
const PORT = 4000;

const oneDay = 1000 * 60 * 60 * 24;

const movies = [
  {
    name : 'Amsterdam',
    image : '/amsterdam.jpg'
  },
  {
    name : 'Avengers',
    image : '/avengers.jpg'
  },
  {
    name : 'Batman',
    image : '/batman.jpg'
  },
  {
    name : 'Black Adam',
    image : '/black-adam.jpg'
  },
  {
    name : 'Bullet Train',
    image : '/bullet-train.jpg'
  },
  {
    name : 'Dune',
    image : '/dune.jpg'
  },
  {
    name : 'Free Guy',
    image : '/free-guy.jpg'
  },
  {
    name : 'Ram Setu',
    image : '/ram-setu.jpg'
  },
  {
    name : 'Soorarai Pottru',
    image : '/soorarai-potru.jpg'
  },
  {
    name : 'Spiderman',
    image : '/spiderman.jpg'
  },
  {
    name : 'Thank God',
    image : '/thank-god.jpg'
  },
  {
    name : 'Top Gun',
    image : '/top-gun.jpg'
  }
]


app.set('view engine', 'ejs');


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'))

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

const myusername = 'Aravind'
const mypassword = '1234'


var session;
app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.render("home", {myusername, movies});
  }else{
    if(req.session.message){
      const message = req.session.message;
      res.render('index', {message})
    }else{
      const message = "";
      res.render('index', {message})
    }
  }
});
app.post('/',(req,res) => {

  if(req.body.username != myusername){
    const message = "Enter valid Username"
    req.session['message'] = message;
    res.redirect('/')
  }else if(req.body.password != mypassword){
    const message = "Enter valid password"
    req.session['message'] = message;
    res.redirect('/')
  }
  else{
      session = req.session;
      session.userid = req.body.username;
      console.log(req.session);
      res.redirect('/');
  }
})
app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});
app.all('*', (req, res) => {
  res.status(404).render('pnf');
})
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));