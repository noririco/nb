const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client({
  //interact with messages that occured BEFORE the bot logged in the server
  // partials: ["MESSAGE"]
});

const BOT_PREFIX = "!";

client.on("ready", () => {
  console.log("ready!");
});

client.on("message", (message) => {
  //example reply
  if (message.content === `${BOT_PREFIX}Ping`) {
    message.reply("Pong!");
    //https://getemoji.com/
    message.react("😈");
  }
});

client.login(process.env.BOT_TOKEN);
