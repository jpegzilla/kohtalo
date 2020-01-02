const rand = (min, max) => Math.round(min + Math.random() * (max - min));

module.exports.handleRoll = (message, client, channelName) => {
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
  const syntaxHint = "!roll (quantity)d(range). ex: !roll 1d20";

  if (tokens.length != 2) {
    return client.action(
      channelName,
      `invalid command (invalid number of params)! syntax: ${syntaxHint}`
    );
  }

  if (
    typeof parts.amount.quant !== "number" ||
    typeof parts.amount.range !== "number"
  ) {
    return client.action(
      channelName,
      `invalid command (params must be numeric)! syntax: ${syntaxHint}`
    );
  }

  let acc = 0;

  for (let i = 0; i < parts.amount.quant; i++)
    acc += rand(1, parts.amount.range);

  client.action(
    channelName,
    `rolled ${parts.amount.quant}d${parts.amount.range}. result: ${acc}!`
  );
};
