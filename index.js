require("dotenv").config();

const tmi = require("tmi.js");
const channelName = process.env.USER || "motoko";

const opts = {
  options: {
    debug: true
  },
  connection: { cluster: "aws", reconnect: true },
  identity: {
    username: "username",
    // token: twitchapps.com/tmi
    password: "oauth token"
  },
  channels: [channelName]
};

const client = new tmi.client(opts);

client.connect();

client.on("connected", (add, port) => {
  client.action(channelName, "bot is connected!");
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!roll") {
    client.action(channelName, "rolling!");
  }
});
