const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const internalError = 500;
const unprocessibleEntity = 422;
const documentCreated = 201;

mongoose.set('debug', true);

mongoose.connect(
  'mongodb://web:password1@ds143953.mlab.com:43953/highscores',
  { useNewUrlParser: true }
);

const scoreSchema = new mongoose.Schema({
  gameId: {
    required: true,
    type: Number
  },
  name: {
    required: true,
    type: String
  },
  score: {
    required: true,
    type: Number
  }
});

const Score = mongoose.model('Score', scoreSchema);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);
mongoose.connection.on('open', () => {
  console.info('connected to highscores db');
  Score.deleteMany({ name: /Test/ }, (err) => console.error.bind(console, err));
});

app.use('/static', express.static('../public'));
app.use(cors());
app.use(bodyParser.json());

app.get('/highscores', (req, res) => {
  console.info('recieved GET request');
  Score.find((err, scores) => {
    if (err) {
      res.status(internalError).json({ error: 'internal server error' });
    } else {
      res.json(scores);
    }
  });
});

app.post('/highscores', (req, res) => {
  console.info('recieved POST request');
  const { gameId, score, name } = req.body;

  Score.create(
    {
      gameId,
      name,
      score
    },
    (err) => {
      if (err) {
        res.status(unprocessibleEntity).json({ error: 'unporcessible entity' });
      } else {
        res.status(documentCreated);
      }
    }
  );
});

const key = fs.readFileSync('encryption/private.key');
const cert = fs.readFileSync('encryption/primary.crt');
const ca = fs.readFileSync('encryption/intermediate.crt');

const httpsPort = 443;
const httpPort = 80;

const options = {
  ca,
  cert,
  key
};

https.createServer(options, app).listen(httpsPort);
http.createServer(app).listen(httpPort);
