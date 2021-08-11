const Discord = require("discord.js");
require("dotenv").config();
const path = require("path");
const logger = require("./logger");
const { parseMessage, setCommands } = require("./_helpers/functions");
const { battlecup } = require("./routines/battlecup");

// REVIEW Dicord Client - the actual bot client
const client = new Discord.Client({
  //interact with messages that occured BEFORE the bot logged in the server
  // partials: ["MESSAGE"]
});

// REVIEW Advanced commands architecture
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// setCommands(path.join(__dirname, "commands"), client);

const getPath = (handler) =>
  path.join(__dirname, "handlers", `${handler}.handler`);

[`command`, `event`].forEach((handler) =>
  require(getPath(handler))(client, Discord)
);

// // REVIEW Client ready event
// client.once("ready", async () => {
//   logger.info("ready!");
//   await battlecup(client);
// });

// // REVIEW Client message event
// client.on("message", async (message) => {
//   if (message.author.bot) return;

//   const { command, args } = parseMessage(message);

//   const c = client.commands.get(command);
//   if (c) c.execute(message, args, Discord);
// });

// REVIEW Client login using AUTH token
client.login(process.env.BOT_TOKEN);
