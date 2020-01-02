require("dotenv").config();

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

console.log(channelName);

const client = new tmi.client(opts);

try {
  client.connect().catch(console.log);
} catch (err) {
  console.log(err);
}

const rand = (min, max) => Math.round(min + Math.random() * (max - min));

client.on("connected", (add, port) => {
  client.action(channelName, "bot is connected!");
});

client.on("chat", (channel, user, message, self) => {
  if (message.startsWith("!roll")) {
    const tokens = message.split(" ");
    const parts = {
      command: tokens[0],
      amount: {
        quant: parseInt(tokens[1].split("d")[0]),
        range: parseInt(tokens[1].split("d")[1])
      }
    };

    // minimal error handling:
    // syntax: (Command)(quantity of random numbers needed: number)d(range: number)
    const syntaxHint = "!roll (quantity)d(range)";

    if (tokens.length > 2)
      return client.action(
        channelName,
        `invalid command (too many params)! syntax: ${syntaxHint}`
      );

    if (
      typeof parts.amount.quant !== "number" ||
      typeof parts.amount.range !== "number"
    )
      return client.action(
        channelName,
        `invalid command (params must be numeric)! syntax: ${syntaxHint}`
      );

    let acc = 0;

    for (let i = 0; i < parts.amount.quant; i++) {
      acc += rand(1, parts.amount.range);
    }

    client.action(
      channelName,
      `rolled ${parts.amount.quant}d${parts.amount.range}. result: ${acc}!`
    );
  }
});
