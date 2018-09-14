const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

// use secret for JWT
const secret = require('../_secrets/keys').jwtKey;

function generateToken(user) {
  // set payload
  const payload = {
    username: user.username,
  };
  // set options
  const options = {
    expiresIn: '1h',
    jwtid: '123456',
    subject: `${user.id}`
  };
  // create token
  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  // implement user registration
  // pull in credentials from request
  const creds = req.body;
  // hash password 2^12 times
  const hash = bcrypt.hashSync(creds.password, 12);
  // set password in creds to hash
  creds.password = hash;

  // insert creds in users DB
  db('users')
    .insert(creds)
    // use returned IDs
    .then(ids => {
      const id = ids[0]
      //query users DB for user where the ID matches
      db('users')
        .where({id})
        // first user
        .first()
        .then(user => {
          // generate token
          const token = generateToken(user);
          // return user ID and token
          res.status(201).json({id: user.id, token})
        })
        .catch(err => {
          res.status(500).send(err);
        })
    })
    .catch(err => {
      res.status(500).send(err);
    })

}

function login(req, res) {
  // implement user login
  // pull in credentials from request
  const creds = req.body;

  // query users DB for user that username matches the request
  db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
      // compare password sent and password stored
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // generate token
        const token = generateToken(user);
        // send token back
        res.status(200).json({token});
      } else {
        res.status(401).json({errorMessage: 'You are not authorized.'});
      }
    })
    .catch(err => res.status(500).send(err));
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
