require("dotenv").config();
const { handleRoll } = require("./utils/roll");
const tmi = require("tmi.js");

const channelName = process.env.CHANNEL_NAME || "motoko";

const opts = {
  options: {
    debug: true
  },
  connection: { cluster: "aws", reconnect: true },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [channelName]
};

const client = new tmi.client(opts);

try {
  client.connect().catch(err => {
    console.log(err);
    throw err;
  });
} catch (err) {
  console.log(err);
  throw err;
}

client.on("connected", (add, port) => {
  client.action(channelName, "kohtalo is connected!");
});

client.on("chat", (channel, user, message, self) => {
  if (message.startsWith("!roll")) handleRoll(message, client, channelName);
});
