'use strict';

const express = require('express');
const config = require('./config');
const Bot = require('./utils/Bot');

let app = express();
let bot = new Bot();

app.get('/', (req, res) => {
  // Check to make sure the request is coming from Slack
  if(req.query.token != config.token) return res.sendStatus(401);

  bot.searchGoogle(req.query.text).then((results) => {
    let message = {
      response_type: 'in_channel',
      attachments: []
    };

    for(var result of results) {
      let attachment = {
        title: result.title,
        title_link: result.href,
        text: result.description
      };
      // Exclude dead links to Images, News, and Books
      if(!/^Images/.test(result.title) && !/^News/.test(result.title) && !/^Books/.test(result.title)) {
        message.attachments.push(attachment);
      }
    }

    res.json(message);
  })
  .catch((err) => {
    res.sendStatus(err);
  });
});

app.listen(9000);
