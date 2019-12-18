const express = require('express');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const knex = require('knex');

const app = express();

const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
	client: 'pg',
	connection: {
	host : '127.0.0.1',
	user : 'postgres',
	password : '1234',
	database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

app.use(bodyParser.json());
app.use(cors())

/*
API DESIGN
/ --> rootroute respond with = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET =user
/image --> PUT --> usser
*/

app.get('/', (req, res) => {
	res.send('it is working');
})


//signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


//profileId
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })


app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
// function to display mssg
app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`});
})




