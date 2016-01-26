# Slack Google Search
**It posts top 5 hits from google**

![](http://i.imgur.com/rE9uR8P.png)

### Installation & Setup

[Create](https://my.slack.com/services/new/bot) a Slack Bot User

Add a `config.json` file

```json
{
  "nickname": "<your-bots-username>",
  "channel": "<your-channel-name>",
  "token": "<your-bots-token>"
 } 
```

`npm i`

`node app`

*In your slack channel*

`/invite [your bots name]`

`google? [search query]`

