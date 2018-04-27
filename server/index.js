//IMPORTS / REQUIRES
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
//The code above (on line 6 specifically) pulls in everything from the .env file and stores in on the process.env object.

//VARIABLES
const app = express();
const port = 3005;

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(__dirname + './../public/build'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));

massive(process.env.DATABASE).then(function(db) {
  app.set('db', db);
});

//ENDPOINTS
app.get('/api/auth', (req, res, next) => {
  if (req.session.userId) {
    res.status(200).send("Session found! User logged in.");
  } else {
    return res.status(403).send("Session not found. Access denied.");
  }
});


app.post('/api/login', (req,res, next) => {
  app.get('db').logInUser(req.body.username, req.body.password).then(loginResults => {
    console.log(loginResults);
    if(loginResults[0]) {
      req.session.userId = loginResults[0].id;
      res.status(200).send("Login successful!");
    } else {
      return res.status(403).send("User not found. Access denied.");
    }
  })
});


app.post('/api/register', (req,res, next) => {
  app.get('db').checkForUsername(req.body.username).then( checkResults => {
    console.log(checkResults);
    if(checkResults[0]) {
      res.status(409).send("Username already in use. Please choose another username or log in.")
    } else {
      app.get('db').registerUser(req.body.username, req.body.password).then( registerResults => {
        console.log(registerResults);
        req.session.userId = registerResults[0].id;
        res.status(200).send("Registration successful!");
      })
    }
  });
});


app.get('/api/dashboard', (req,res, next) => {
  if (req.session.userId) {
    app.get('db').getPropertyInfo(req.session.userId).then( current_listed_properties => {
      console.log(current_listed_properties);
      res.status(200).send(current_listed_properties);
    });
  } else {
    return res.status(403).send("Session not found. Access denied.")
  }
});


app.get('/api/logout', (req, res, next) => {
    req.session.destroy();
    return res.status(200).send("User logged out!");
});


app.post('/api/wizard/5', (req,res) => {
  app.get('db').createPropertyInfo(
      req.session.userId, 
      req.body.p_name,
      req.body.p_description,
      req.body.p_address,
      req.body.p_city,
      req.body.p_state,
      req.body.p_zip,
      req.body.p_img_url,
      req.body.p_loan_amount,
      req.body.p_monthly_mortgage,
      req.body.p_recommended_rent,
      req.body.p_desired_rent
    ).then( (name_of_info_coming_back) => {
    res.status(200).send("property item added!");
  });
});



/*

app.delete('/api/dashboard', (req,res) => {
  app.get('db').deletePropertyInfo(name.of.parameter).then( () => {
    res.status(200).send("property item deleted!");
  });
});

*/

//LISTEN
app.listen(port, () => console.log(`listening on port ${port}!`));