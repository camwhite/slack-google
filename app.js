'use strict';

const express = require('express');
const config = require('./config');
const Bot = require('./utils/Bot');

let app = express();
let bot = new Bot();

app.get('/', (req, res) => {
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
      if(!/^Images/.test(result.title)) {
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
