const Discord = require("discord.js");
require("dotenv").config();
const path = require("path");
const logger = require("./logger");
const { parseMessage, setCommands } = require("./_helpers/functions");
const { battlecup } = require("./routines/battlecup");

const client = new Discord.Client({
  //interact with messages that occured BEFORE the bot logged in the server
  // partials: ["MESSAGE"]
});

client.commands = new Discord.Collection();

setCommands(path.join(__dirname, "commands"), client);

client.once("ready", async () => {
  logger.info("ready!");
  await battlecup(client);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  const { command, args } = parseMessage(message);

  const c = client.commands.get(command);
  if (c) c.execute(message, args, Discord);
});

client.login(process.env.BOT_TOKEN);
