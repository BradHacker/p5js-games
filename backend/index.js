const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const internalError = 500;
const unprocessibleEntity = 422;
const documentCreated = 201;

mongoose.set('debug', true);

mongoose.connect(
  'mongodb://localhost/highscores',
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

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.info('recieved GET request');
  Score.find((err, scores) => {
    if (err) {
      res.status(internalError).json({ error: 'internal server error' });
    } else {
      res.json(scores);
    }
  });
});

app.post('/', (req, res) => {
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

app.listen(port, () => console.info(`Listening on Port: ${port}`));
