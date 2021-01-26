require('dotenv').config();
const express = require('express');
const Twitter = require('twitter');
const cors=require('cors')

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  bearer_token: process.env.BEARER_TOKEN
});
 
const defaults = {
  screen_name: 'realDonaldTrump',
  tweet_mode: 'extended',
  count: 20,
};

const app = express();
app.use(cors());

app.route('/:handle')
  .get(function(req, res) {
    const params = {
      ...defaults,
      max_id: req.query.max_id,
      screen_name: req.params.handle,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.json(tweets);
      } else {
        console.error(error)
      }
    });
  });

app.listen(3000, function(error) {
  console.log('Trump listening on port 3000');
});

