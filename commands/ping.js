module.exports = {
  name: "ping",
  description: "a sample ping pong command",
  execute(client, message, args) {
    message.channel.send("pong!");
    //https://getemoji.com/
    message.react("😈");
  },
};
