# kohtalo

this is a simple dice rolling bot for twitch.

in order to use it, please create a file in the root directory of the bot called `.env`. in this file, you need to place three variables:

-   an oauth token from <https://twitchapps.com/tmi>,
-   a username for the bot, which can be your account or a separate bot account,
-   and the channel name to connect to!


example:

```
OAUTH_TOKEN=your-token-here
BOT_USERNAME=your-bots-username
CHANNEL_NAME=your-channel-name
```

## start:

simply run `npm i` and then `npm start` in the bot's root directory. the bot should send a message to your twitch chat saying "kohtalo is connected!"
