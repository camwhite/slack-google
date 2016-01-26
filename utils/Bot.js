'use strict';

const chalk = require('chalk');
const google = require('google');
const Slack = require('slack-client');


class Bot {
  constructor(opts) {
    this.opts = opts;
    this.google = google;

    this.slack = new Slack(opts.token);
    this.slack.login();

    let pattern = /^google\?/;
    this.slack.on('message', (message) => {
      if(pattern.test(message.text)) {
        let searchTerm = message.text.split(' ').slice(1, message.text.length).join(' ');
        this.searchGoogle(searchTerm);
      }
    })
  }
  searchGoogle(query) {
    this.google(query, (err, next, links) => {
      const channel = this.slack.getChannelGroupOrDMByName(this.opts.channel);
      let topFiveLinks = links.slice(0, 4);
      for(var link of topFiveLinks) {
        let message = {
          text: `${link.href}\n${link.description}`,
          username: this.opts.nickname,
          icon_url: 'http://www.theweeklyreporter.com/wp-content/uploads/2015/09/G_is_For_Google_New_Logo_Thumb.png',
          parse: 'full',
        }
        channel.postMessage(message);
      }


    });
  }
}

module.exports = Bot;
