const path = require("path");
const fs = require("fs");
const logger = require("../logger");

const commandsDir = path.join(__dirname, "..", "commands");
logger.info(`[command.handle.js] ${commandsDir}`);

module.exports = (client, Discord) => {
  const commandFiles = fs
    .readdirSync(commandsDir)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    logger.info(`[command.handle.js] ${filePath}`);

    const command = require(filePath);
    client.commands.set(command.name, command);
  }
};
