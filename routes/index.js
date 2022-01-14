const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request for login recieved');
  res.render('login');
});

router.get('/home', (req, res) => {
    console.log('Request for home page recieved');
    res.render('home');
  });

router.get('/profiili', (req, res) => {
  console.log('Request for profiili page recieved');
  res.render('profiili');
});

router.get('/asetukset', (req, res) => {
  console.log('Request for asetukset page recieved');
  res.render('asetukset');
});

module.exports = router;