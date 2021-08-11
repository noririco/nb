const logger = require("../../logger");
const { battlecup } = require("../../routines/battlecup");

module.exports = async (Discord, client) => {
  logger.info(`ready!`);
  logger.info(`I am ready! Logged in as ${client.user.tag}!`);
  logger.info(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  await battlecup(client);
};
